import cloudinary from "../lib/Cloudinary.js";
import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
    const { title, description, category, department, venue, startDate, endDate, registrationDeadline, fee, status, medias } = req.body;
    try {
        let uploadedMedia = [];
        if (medias && medias?.length > 0) {
            for (const media of medias) {
                const cloudinaryResponse = await cloudinary.uploader.upload(image, {
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
            status,
            organizer: req.user?._id,
            medias: uploadedMedia
        });
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    };
};

export const editEvent = async (req, res) => {
    const { title, description, category, department, venue, startDate, endDate, registrationDeadline, fee, status } = req.body;
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
            fee,
            status
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

        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const allEvents = async (req, res) => {
    try {
        const events = Event.find({});
        res.status(200).json({ events });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};