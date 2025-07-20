import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {

    const { name, nic, dateofbirth, gender, phone, email, password, usertype, registrationdate } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const {
            path: secure_url = null,
            filename: public_id = null,
        } = req.file || {};


        const newuser = new User({
            name,
            nic,
            dateofbirth,
            gender,
            phone,
            email,
            password: hashedPassword,
            usertype,
            registrationdate,
            profileimage: { url: secure_url, publicId: public_id }
        });

        await newuser.save();

        res.status(201).json({
            message: "User successfuly registered",
            user: {
                id: newuser._id,
                name: newuser.name,
                email: newuser.email,
                profileImage: newuser.profileimage.url,
                UserType: newuser.usertype
            }
        });

    } catch (err) {
        console.error("User registration error:", err.message);
        res.status(500).json({ message: "Failed to register user" });
    }
};


export const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve users" });
    }
};


export const viewOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve user" });
    }
};


export const updateUser = async (req, res) => {
    const { name, nic, dateofbirth, gender, phone, email } = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findById( userId );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, nic, dateofbirth, gender, phone, email },
            { new: true }
        );

        res.status(200).json({ message: "User updated", updatedUser });

    } catch (err) {
        res.status(500).json({ message: "Failed to update user details" });
    }
};


export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

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