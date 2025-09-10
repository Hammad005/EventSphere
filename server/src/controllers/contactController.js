import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
    try {
        const {fullName, email, message}= req.body;

        await Contact.create({
            fullName,
            email,
            message
        });

        res.status(200).json({message: "Message sent successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const messages = await Contact.find({});

        res.status(200).json({messages});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const deleteMessage = async (req, res) => {
    const {id} = req.params;
    try {
        await Contact.findByIdAndDelete(id);

        res.status(200).json({message: "Message deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}