import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, email, password, enrollmentNumber, role, phone, department } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: "Password must be at least 6 characters long",
            })
        };

        const exisitingUser = await User.find({ email });

        if (exisitingUser.length > 0) {
            return res.status(400).json({
                success: false,
                error: "Email already in use",
            });
        };

        const user = await User.create({
            name,
            email,
            password,
            enrollmentNumber,
            role,
            phone,
            department,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "2d"
        });

        const userWithoutPassword = { ...user._doc }
        delete userWithoutPassword.password

        res.cookie("EventSphereAuth", token, {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
            secure: process.env.NODE_ENV === "production",
        })
            .status(201)
            .json({ user: userWithoutPassword })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" })
    }
};