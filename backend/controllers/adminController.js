import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Admin from "../models/admin.js";
import cloudinary from "../config/cloudinary.js";

export const registerAdmin = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        if (await User.exists({ email })) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const {
            path: secure_url = null,
            filename: public_id = null
        } = req.file || {};

        const [newUser, newAdmin] = await Promise.all([
            User.create({
                email,
                password: hashedPass,
                usertype: "Admin"
            }),
            Admin.create({
                name,
                phone,
                email,
                profileimage: { url: secure_url, publicId: public_id }
            })
        ]);

        res.status(201).json({
            message: "Admin successfully registered",
            admin: {
                adminId: newAdmin.adminId,
                name: newAdmin.name,
                email: newAdmin.email,
                profileImage: newAdmin.profileimage.url,
                usertype: newAdmin.usertype
            }
        });

    } catch (err) {
        console.error("Admin registration error:", err);
        res.status(500).json({ message: "Failed to register admin" });
    }
};


export const viewAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (err) {
        console.error("Error fetching admins:", err);
        res.status(500).json({ message: "Failed to retrieve admins" });
    }
};


export const viewOneAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ adminId: req.params.id });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);

    } catch (err) {
        console.error("Error fetching admin:", err);
        res.status(500).json({ message: "Failed to retrieve admin" });
    }
};


export const updateAdmin = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const { id: adminId } = req.params;

        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const oldEmail = admin.email;

        const [updatedAdmin, updatedUser] = await Promise.all([
            Admin.findOneAndUpdate(
                { adminId },
                { name, phone, email },
                { new: true }
            ),
            User.findOneAndUpdate(
                { email: oldEmail },
                { email },
                { new: true }
            )
        ]);

        res.status(200).json({
            message: "Admin updated",
            admin: updatedAdmin
        });
    } catch (err) {
        console.error("Error updating admin:", err);
        res.status(500).json({ message: "Failed to update admin details" });
    }
};


export const updateAdminProfile = async (req, res) => {
    try {
        const { id: adminId } = req.params;
        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (admin.profileimage.publicId) {
            await cloudinary.uploader.destroy(admin.profileimage.publicId);
        }

        const {
            path: secure_url = null,
            filename: public_id = null
        } = req.file || {};

        admin.profileimage.url = secure_url;
        admin.profileimage.publicId = public_id;
        await admin.save();

        res.status(200).json({
            message: "Profile image updated",
            profileImage: admin.profileimage.url
        });
        
    } catch (err) {
        console.error("Error updating profile image:", err);
        res.status(500).json({ message: "Failed to update profile image" });
    }
};


export const deleteAdmin = async (req, res) => {
    try {
        const { id: adminId } = req.params;
        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (admin.profileimage.publicId) {
            await cloudinary.uploader.destroy(admin.profileimage.publicId);
        }

        await Promise.all([
            Admin.deleteOne({ adminId }),
            User.deleteOne({ email: admin.email })
        ]);

        res.status(200).json({ message: "Admin and user deleted successfully" });
    } catch (err) {
        console.error("Error deleting admin:", err);
        res.status(500).json({ message: "Failed to delete admin" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const payload = { userId: user._id, usertype: user.usertype };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "6h"
        });

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};