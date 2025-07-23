
import mongoose from "mongoose";
import User from "./User.js";

const phoneRegex = /^0\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PatientSchema = new mongoose.Schema(
    {
        patientId: {
            type: String
        },

        name: {
            type: String,
            required: [true, "Patient name is required"],
            trim: true,
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            validate: {
                validator: (v) => phoneRegex.test(v),
                message: (props) => `${props.value} is not a valid phone number`,
            },
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v) => emailRegex.test(v),
                message: (props) => `${props.value} is not a valid email address`,
            },
        },

        dateOfBirth: {
            type: Date,
            required: [true, "Date of birth is required"],
        },

        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: ["Male", "Female", "Other"],
        },

        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },

        prescriptionFiles: [
            {
                url: { type: String, default: null },
                publicId: { type: String, default: null }
            }
        ],

        verificationDocs: [
            {
                url: { type: String, default: null },
                publicId: { type: String, default: null }
            }
        ],

        registrationDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
    }
);

// Auto-generate sequential patientId: P-0001, P-0002, etc.
PatientSchema.pre("save", async function (next) {
    if (this.isNew) {
        const lastPatient = await this.constructor
            .findOne({ patientId: { $regex: /^P-\d{4}$/ } })
            .sort({ patientId: -1 })
            .exec();

        let nextNumber = 1;
        if (lastPatient && lastPatient.patientId) {
            const parts = lastPatient.patientId.split("-");
            nextNumber = parseInt(parts[1], 10) + 1;
        }

        const padded = String(nextNumber).padStart(4, "0");
        this.patientId = `P-${padded}`;
    }
    next();
});

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
