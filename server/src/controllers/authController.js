import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, email, password, role, phone, department } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: "Password must be at least 6 characters long",
            })
        };

        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) {
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

        const generateEnrollmentNumber = (departmentCode) => {
            const year = new Date().getFullYear();
            const random = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
            return `${departmentCode.slice(0, 3).toUpperCase()}-${year}-${random}`;
        };
        if (role === "participant") {
            generateEnrollmentNumber(department);
            user.enrollmentNumber = generateEnrollmentNumber(department);
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "2d"
        });

        const userWithoutPassword = { ...user._doc }
        delete userWithoutPassword.password

        res.cookie("EventSphereAuth", token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
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

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                error: "Invalid Credentials"
            })
        };

        const isMatch = await existingUser.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: "Invalid Credentials"
            })
        };

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "2d"
        });

        const userWithoutPassword = { ...existingUser._doc }
        delete userWithoutPassword.password

        res.cookie("EventSphereAuth", token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
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

export const logout = async (req, res) => {
    try {
        res.clearCookie("EventSphereAuth", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const update = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        if (email !== req.user.email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({ error: "Email already in use" });
            }
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updateUser = await User.findByIdAndUpdate(user._id, {
            name,
            email,
            phone
        });

        const userWithoutPassword = { ...updateUser._doc }
        delete userWithoutPassword.password

        res.status(200).json({ message: "Updated successfully", user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};