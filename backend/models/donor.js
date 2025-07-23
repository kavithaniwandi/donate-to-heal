import mongoose from "mongoose";

const phoneRegex = /^0\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DonorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            validate: {
                validator: (v) => phoneRegex.test(v),
                message: (props) => `${props.value} is not a valid phone number`,
            }
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
            }
        },

        nic: {
            type: String,
            required: [true, "NIC is required"],
            minlength: [10, "NIC must be at least 9 digits"],
            maxlength: [12, "NIC cannot exceed 12 digits"]
        },

        dateofbirth: {
            type: Date,
            required: [true, "Date of birth is required"]
        },

        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: {
                values: ["Male", "Female"],
                message: "{VALUE} is not a valid gender",
            }
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [4, "Password must be at least 4 characters"]
        },

        usertype: {
            type: String,
            required: true,
            enum: ["Patient", "Donor", "Admin", "Hospital"]
        },

        profileimage: {
            url: { type: String, default: null },
            publicId: { type: String, default: null }
        },

        registrationdate: {
            type: Date,
            required: [true, "Registration date is required"],
            default: Date.now
        }
    }
);

const Donor = mongoose.model("Donor", DonorSchema);
export default Donor;