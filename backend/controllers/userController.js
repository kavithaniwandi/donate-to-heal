import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const register = async (req, res) => {

    const { name, nic, dateofbirth, gender, phone, email, password, usertype, registrationdate } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, nic, dateofbirth, gender, phone, email, password: hashedPassword, usertype, registrationdate });
        await user.save();

        res.status(201).json({
            token, user: {
                UserId: user._id,
                Name: user.name,
                Email: user.email,
                UserType: user.usertype
            }
        });

    } catch (err) {
        console.error("User registration error:", err.message);
        res.status(500).json({ message: "Failed to register user" });
    }
};


const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve users" });
    }
};


const viewOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve user" });
    }
};


const updateUser = async (req, res) => {
    try {
        const { name, nic, dateofbirth, gender, phone, email } = req.body;

        const userId = req.params.id;

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            { userId },
            { name, nic, dateofbirth, gender, phone, email },
            { new: true }
        );

        res.status(200).json({ message: "User updated", updatedUser });

    } catch (err) {
        res.status(500).json({ message: "Failed to update user details" });
    }
};


const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete({ useId: req.params.id });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};


const login = async (req, res) => {
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

module.exports = { register, viewAllUsers, viewOneUser, updateUser, deleteUser, login }