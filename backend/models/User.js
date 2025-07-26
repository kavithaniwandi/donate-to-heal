import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
        userId: {
            type: String
        },

		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true
		},

		password: {
			type: String,
			required: [true, "Password is required"]
		},

		usertype: {
			type: String,
			required: true,
			enum: ["Patient", "Donor", "Admin", "Hospital","MedicalOffice"],
		}
	}
);

const User = mongoose.model("User", UserSchema);
export default User;