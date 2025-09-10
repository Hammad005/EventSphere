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
            medias: uploadedMedia
        });
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};