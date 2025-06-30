import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  const { name, dob, age, gender, contact, NIC, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, dob, age, gender, contact, NIC, email, password: hashedPassword });
    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { 
      id: user.id,
      name: user.name,
      dob: user.dob,
      age: user.age,
      gender: user.gender,
      contact: user.contact,
      NIC: user.NIC,
      email: user.email
    }});
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send('Server error');
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

export const updateProfile = async (req, res) => {
  const { name, dob, age, gender, contact, NIC } = req.body;

  try {
    let user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.dob = dob || user.dob;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.contact = contact || user.contact;
    user.NIC = NIC || user.NIC;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
