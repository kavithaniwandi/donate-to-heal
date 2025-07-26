import mongoose from "mongoose";

const phoneRegex = /^0\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nicRegex = /^[0-9]{9}[vVxX]?$|^[0-9]{12}$/; // Matches old (9 digits + V/X) and new (12 digits) NIC formats

const PatientSchema = new mongoose.Schema(
    {
        patientId: {
            type: String,
        },

        fullname: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        dateofbirth: {
            type: Date,
            required: [true, "Date of birth is required"],
        },

        nic: {
            type: String,
            required: [true, "NIC is required"],
            unique: true,
            validate: {
                validator: (v) => nicRegex.test(v),
                message: (props) => `${props.value} is not a valid NIC`,
            },
        },

        medicalofficer: {
            type: String,
            required: [true, "Medical Officer name is required"],
            trim: true,
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            validate: {
                validator: (v) => phoneRegex.test(v),
                message: (props) => `${props.value} is not a valid phone number`,
            },
        },

        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [4, "Password must be at least 4 characters"],
        },

        address: {
            type: String,
            required: [true, "Address is required"],
        },

        gramaSewakaCertificate: {
            url: { type: String, default: null },
            publicId: { type: String, default: null },
        },

        registrationdate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Auto-generate Patient ID
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
