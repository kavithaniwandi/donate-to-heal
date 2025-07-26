import bcrypt from "bcryptjs";
import Patient from "../models/patient.js";
import cloudinary from "../config/cloudinary.js";

// Create a new patient
export const createPatient = async (req, res) => {
    try {
        const {
            fullname,
            dateofbirth,
            nic,
            medicalofficer,
            gender,
            phone,
            username,
            password,
            address,
        } = req.body;

        // Check if username or NIC already exists
        const existingPatient = await Patient.findOne({ $or: [{ username }, { nic }] });
        if (existingPatient) {
            return res.status(400).json({ message: "Username or NIC already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Handle Grama Sewaka Certificate (if uploaded)
        const {
            path: secure_url = null,
            filename: public_id = null,
        } = req.file || {};

        const newPatient = new Patient({
            fullname,
            dateofbirth,
            nic,
            medicalofficer,
            gender,
            phone,
            username,
            password: hashedPassword,
            address,
            gramaSewakaCertificate: { url: secure_url, publicId: public_id },
        });

        await newPatient.save();

        res.status(201).json({
            message: "Patient registered successfully",
            patient: {
                id: newPatient._id,
                patientId: newPatient.patientId,
                fullname: newPatient.fullname,
                username: newPatient.username,
                phone: newPatient.phone,
            },
        });
    } catch (err) {
        console.error("Patient registration error:", err);
        res.status(500).json({ message: "Failed to register patient" });
    }
};

// View all patients
export const viewAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve patients" });
    }
};

// View one patient by ID
export const viewOnePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve patient" });
    }
};

// Update patient details
export const updatePatient = async (req, res) => {
    const {
        fullname,
        dateofbirth,
        nic,
        medicalofficer,
        gender,
        phone,
        username,
        address,
    } = req.body;

    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            {
                fullname,
                dateofbirth,
                nic,
                medicalofficer,
                gender,
                phone,
                username,
                address,
            },
            { new: true }
        );

        res.status(200).json({ message: "Patient updated successfully", updatedPatient });
    } catch (err) {
        res.status(500).json({ message: "Failed to update patient" });
    }
};

// Delete a patient (and their Grama Sewaka Certificate if exists)
export const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Delete certificate from Cloudinary if present
        if (patient.gramaSewakaCertificate.publicId) {
            await cloudinary.uploader.destroy(patient.gramaSewakaCertificate.publicId);
        }

        await Patient.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Patient and certificate deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete patient" });
    }
};
