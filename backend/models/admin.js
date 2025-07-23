import mongoose from "mongoose";

const phoneRegex = /^0\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminSchema = new mongoose.Schema(
    {
        adminId: {
            type: String
        },

        name: {
            type: String,
            required: [true, "Name is required"], 
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

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [4, "Password must be at least 4 characters"],
        },

        usertype: {
            type: String,
            required: true,
            enum: ["Patient", "Donor", "Admin", "Hospital"],
        },

        profileimage: {
            url: { type: String, default: null },
            publicId: { type: String, default: null },
        },

        registrationdate: {
            type: Date,
            required: [true, "Registration date is required"],
            default: Date.now,
        },
    }
);


AdminSchema.pre("save", async function (next) {

    if (this.isNew) {

        const lastAdmin = await this.constructor
            .findOne({ adminId: { $regex: /^A-\d{4}$/ } })
            .sort({ adminId: -1 })
            .exec();

        let nextNumber = 1;
        if (lastAdmin && lastAdmin.adminId) {

            const parts = lastAdmin.adminId.split("-");
            nextNumber = parseInt(parts[1], 10) + 1;
        }

        const padded = String(nextNumber).padStart(4, "0");
        this.adminId = `A-${padded}`;
    }
    next();
});

const Admin = mongoose.model("AdminUser", AdminSchema);
export default Admin;