import mongoose from "mongoose";
import User from "./user.js";

const PatientSchema = new mongoose.Schema({

    nic: {
        type: String,
        required: [true, "NIC is required"],
        minlength: [10, "NIC must be at least 9 digits"],
        maxlength: [12, "NIC cannot exceed 12 digits"],
    },

    dateofbirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },

    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: {
            values: ["Male", "Female"],
            message: "{VALUE} is not a valid gender",
        },
    }
});

const Patient = User.discriminator("Patient", PatientSchema);
export default Patient