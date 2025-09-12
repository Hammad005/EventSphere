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
        const generateEnrollmentNumber = (departmentCode) => {
            const year = new Date().getFullYear();
            const random = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
            return `${departmentCode.slice(0, 3).toUpperCase()}-${year}-${random}`;
        };

        const user = await User.create({
            name,
            email,
            password,
            role,
            enrollmentNumber: role === "participant" ? generateEnrollmentNumber(department) : null,
            phone,
            department,
        });

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

export const createOrganizer = async (req, res) => {
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
            role,
            phone,
            department,
        });

        const userWithoutPassword = { ...user._doc }
        delete userWithoutPassword.password

        res.status(201).json({ user: userWithoutPassword })

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
        } else if (!existingUser?.isActive) {
                return res.status(403).json({
                    error: "Your account has been deactivated by the administrator. Please contact support for further assistance."
                });
        }

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

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: "admin" } }, "-password").sort({ createdAt: -1 });
        if (!users) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const update = async (req, res) => {
    const { name, email, phone, department } = req.body;
    try {
        for (const [key, value] of Object.entries({ name, email, phone })) {
            if (!value) {
                return res.status(400).json({ error: `${key} is required` });
            }
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        if (email !== req.user.email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({ error: "Email already in use" });
            }
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updateUser = await User.findByIdAndUpdate(req.user._id, {
            name,
            email,
            phone,
            department
        }, { new: true });

        const userWithoutPassword = { ...updateUser._doc }
        delete userWithoutPassword.password

        res.status(200).json({ message: "Updated successfully", user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


export const deactivate = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "You are not eligible to deactivate this user" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      isActive: user.isActive, // optional but useful for frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
