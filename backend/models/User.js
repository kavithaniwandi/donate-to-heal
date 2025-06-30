import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    NIC: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
