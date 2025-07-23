import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Admin from "../models/admin.js";
import cloudinary from "../config/cloudinary.js";

export const registerAdmin = async (req, res) => {

    const { name, phone, email, password, usertype, registrationdate } = req.body;

    try {
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).json({ message: "Admin already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const {
            path: secure_url = null,
            filename: public_id = null,
        } = req.file || {};


        const newUser = new User({
            email,
            password: hashedPassword,
            usertype
        });

        const newAdmin = new Admin({
            name,
            phone,
            email,
            password: hashedPassword,
            usertype,
            registrationdate,
            profileimage: { url: secure_url, publicId: public_id }
        });

        await newUser.save();
        await newAdmin.save();

        res.status(201).json({
            message: "Admin successfuly registered",
            admin: {
                adminId: newAdmin.adminId,
                name: newAdmin.name,
                email: newAdmin.email,
                profileImage: newAdmin.profileimage.url,
                UserType: newAdmin.usertype
            }
        });

    } catch (err) {
        console.error("Admin registration error:", err.message);
        res.status(500).json({ message: "Failed to register admin" });
    }
};


export const viewAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);

    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve admins" });
    }
};


export const viewOneAdmin = async (req, res) => {
    try {
        const user = await Admin.findOne({ adminId: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve user" });
    }
};


export const updateUser = async (req, res) => {
    const { name, phone, email } = req.body;
    const userId = req.params.id;

    try {
        const user = await Admin.findById( userId );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedAdmin = await Admin.findOneAndUpdate(
            { userId },
            { name, phone, email },
            { new: true }
        );

        const updatedUser = await User.findOneAndUpdate(
            { userId },
            { email },
            { new: true }
        );

        res.status(200).json({ message: "User updated", updatedUser });

    } catch (err) {
        res.status(500).json({ message: "Failed to update user details" });
    }
};


export const updateUserProfile = async (req, res) => {

    const adminId = req.params.id;

    try {
        const user = await User.findOne({ adminId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.profileimage.publicId) {
            await cloudinary.uploader.destroy(user.profileimage.publicId);
        }

        const {
            path: secure_url = null,
            filename: public_id = null,
        } = req.file || {};

        user.profileimage.url = secure_url;
        user.profileimage.publicId = public_id;
        
        await user.save();

        // respond
        res.status(200).json({
            message: "Profile image updated",
            profileImage: user.profileimage.url
        });

    } catch (err) {
        console.error("Error updating profile image:", err);
        res.status(500).json({ message: "Failed to update profile image" });
    }
};


export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findOne({userId});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // delete profile image from Cloudinary
        if (user.profileimage.publicId) {
            await cloudinary.uploader.destroy(user.profileimage.publicId);
        }

        // remove user from database
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User and profile image deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });

        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send("Server error");
    }
};