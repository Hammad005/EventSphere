import cloudinary from "../lib/cloudinary.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

export const createEvent = async (req, res) => {
    const { title, description, category, department, venue, startDate, endDate, registrationDeadline, fee, medias } = req.body;
    try {
        let uploadedMedia = [];
        if (medias && medias?.length > 0) {
            for (const media of medias) {
                const cloudinaryResponse = await cloudinary.uploader.upload(media, {
                    folder: `EventSphere/medias/${title}`,
                });

                if (!cloudinaryResponse || cloudinaryResponse.error) {
                    throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
                }

                uploadedMedia.push({
                    mediaId: cloudinaryResponse.public_id,
                    mediaUrl: cloudinaryResponse.secure_url,
                });
            }
        }

        const event = await Event.create({
            title,
            description,
            category,
            department,
            venue,
            startDate,
            endDate,
            registrationDeadline,
            fee,
            organizer: req.user?._id,
            medias: uploadedMedia,
            approved: req.user?.role === "admin",
        });

        await User.updateOne({ _id: req.user?._id }, { $push: { managedEvents: event?._id } });
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    };
};

export const approveEvent = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ error: "You are not eligible to approve this event" });
        }
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        event.createdBy = req.user?._id;
        event.approved = true;
        await event.save();

        await User.updateMany({}, {
            $push: {
                notifications: {
                    message: `New upcoming event "${event?.title}", last date of registration ${new Date(
                        event?.registrationDeadline
                    ).toLocaleString()}.`
                }
            }
        });

        res.status(200).json({
            message: "Event approved successfully", notification: `New upcoming event "${event?.title}", last date of registration ${new Date(
                event?.registrationDeadline
            ).toLocaleString()}.`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const editEvent = async (req, res) => {
    const { title, description, category, department, venue, startDate, endDate, registrationDeadline, fee } = req.body;
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        if (req.user?.role !== "admin" && event?.organizer !== req.user?._id) {
            return res.status(403).json({ error: "You are not authorized to edit this event" });
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, {
            title,
            description,
            category,
            department,
            venue,
            startDate,
            endDate,
            registrationDeadline,
            fee
        }, { new: true });

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        if (req.user?.role !== "admin" && event?.organizer !== req.user?._id) {
            return res.status(403).json({ error: "You are not authorized to delete this event" });
        }

        for (const media of event?.medias) {
            await cloudinary.uploader.destroy(media.mediaId);
        }

        await User.updateMany(
            { "registeredEvents.eventId": id },
            { $pull: { registeredEvents: { eventId: id } } }
        );
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const cancelEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        if (req.user?.role !== "admin" && event?.organizer !== req.user?._id) {
            return res.status(403).json({ error: "You are not authorized to cancel this event" });
        }

        event.status = "cancelled";
        await event?.save();

        const user = await User.findById(req.user?._id);
        user.registeredEvents.find((r) => r.eventId.toString() === event._id.toString()).status = "cancelled";
        await user.save();

        return res.status(200).json({
            message: "Event cancelled successfully",
            eventId: id,
            userId: user._id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const allApprovedEvents = async (req, res) => {
    try {
        const events = await Event.find({ approved: true }).sort({ createdAt: -1 }).populate("organizer", "name").populate("createdBy", "name");
        res.status(200).json({ events });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};
export const allEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({ createdAt: -1 }).populate("organizer", "name").populate("createdBy", "name");
        res.status(200).json({ events });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const registerInEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event maybe deleted or not found" });
        }

        // check if registration deadline is over
        if (new Date() > event.registrationDeadline) {
            return res.status(400).json({ error: "Registration deadline has passed" });
        }

        const user = await User.findById(req.user?._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // only participants can register
        if (user.role !== "participant") {
            return res.status(403).json({ error: "Only participants can register in events" });
        }

        // prevent duplicate registration in user
        const alreadyRegisteredUser = user.registeredEvents.some(
            (r) => r.eventId.toString() === event._id.toString()
        );
        if (alreadyRegisteredUser) {
            return res.status(400).json({ error: "Already registered for this event" });
        }

        // prevent duplicate registration in event
        const alreadyRegisteredEvent = event.participants.some(
            (p) => p.user.toString() === user._id.toString()
        );
        if (alreadyRegisteredEvent) {
            return res.status(400).json({ error: "Already registered for this event" });
        }


        // push into user
        user.registeredEvents.push({
            eventId: event._id,
        });
        await user.save();

        // push into event
        event.participants.push({
            user: user._id,
        });
        await event.save();

        return res.status(200).json({
            message: "Successfully registered for event",
            eventId: event,
            userId: user,
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
    }
};

export const eventAttended = async (req, res) => {
    const { id, userId } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        };
        if (req.user?.role !== "admin" && event?.organizer !== req.user?._id) {
            return res.status(403).json({ error: "You are not eligible to mark user attendance" });
        } else if (startDate > new Date() || endDate < new Date()) {
            return res.status(400).json({ error: "Event registration deadline has passed" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "Event not found" });
        };

        // prevent duplicate attendance in user
        const alreadyAttendedUser = user.registeredEvents.some(
            (r) => r.eventId.toString() === event._id.toString() && r.status === "attended"
        );
        if (alreadyAttendedUser) {
            return res.status(400).json({ error: "Already attended for this event" });
        }

        // prevent duplicate attendance in event
        const alreadyAttendedEvent = event.participants.some(
            (p) => p.user.toString() === user._id.toString() && p.attended === true
        );
        if (alreadyAttendedEvent) {
            return res.status(400).json({ error: "Already attended for this event" });
        }

        const registeredEvent = user.registeredEvents.find(
            (r) => r.eventId.toString() === event._id.toString()
        );

        if (registeredEvent) {
            registeredEvent.attendanceStatus = "attended";

            // If payment is still pending, mark as paid on attendance
            if (registeredEvent.paymentStatus === "pending") {
                registeredEvent.paymentStatus = "paid";
            }
        }

        await user.save();


        event.status = "ongoing";
        const participant = event.participants.find(
            (r) => r.user.toString() === user._id.toString()
        );

        if (participant) {
            participant.attended = true;

            // If payment is still pending, mark as paid on attendance
            if (participant.paymentStatus === "pending") {
                participant.paymentStatus = "paid";
            }
        }

        await event.save();

        res.status(200).json({ message: "Successfully marked user attendance" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const issueCertificate = async (req, res) => {
    const { id, userId } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        };
        if (req.user?.role !== "admin" && event?.organizer !== req.user?._id) {
            return res.status(403).json({ error: "You are not eligible to issue the certificate" });
        };

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "Event not found" });
        };

        // prevent duplicate attendance in user
        const alreadyAttendedUser = user.registeredEvents.some(
            (r) => r.eventId.toString() === event._id.toString() && r.certificateIssued === true
        );
        if (alreadyAttendedUser) {
            return res.status(400).json({ error: "Already issued certificate for this event" });
        }

        // prevent duplicate attendance in event
        const alreadyAttendedEvent = event.participants.some(
            (p) => p.user.toString() === user._id.toString() && p.certificateIssued === true
        );
        if (alreadyAttendedEvent) {
            return res.status(400).json({ error: "Already issued certificate for this event" });
        }

        const registeredEvent = user.registeredEvents.find(
            (r) => r.eventId.toString() === event._id.toString()
        );

        if (registeredEvent) {
            registeredEvent.certificateIssued = true;
        }

        await user.save();


        event.status = "completed";
        const participant = event.participants.find(
            (r) => r.user.toString() === user._id.toString()
        );

        if (participant) {
            participant.certificateIssued = true;
        }

        await event.save();

        res.status(200).json({ message: "Successfully issued certificate" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const eventFeedback = async (req, res) => {
    const { id } = req.params;
    const { name, message } = req.body;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event maybe deleted or not found" });
        }

        event.feedback?.push({
            name,
            message
        });

        await event.save();
        return res.status(200).json({ message: "Successfully submitted feedback", event: event });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ error: error.message || "Internal Server Error" });
    }
};
