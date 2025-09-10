import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: true,
        require: true
    },
    message: {
        type: true,
        require: true
    }
}, {timestamps: true});
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;