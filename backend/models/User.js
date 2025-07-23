import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new mongoose.Schema(
	{
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
		}
	}
);

const User = mongoose.model("User", UserSchema);
export default User;