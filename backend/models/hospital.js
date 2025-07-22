import mongoose from "mongoose";
import User from "./user.js";

const HospitalSchema = new mongoose.Schema({

    hospitalName: {
        type: String,
        required: [true, "Hospital name is required"],
    },

    address: {
        type: String,
        required: [true, "Address is required"],
    },
    
    location: {
        type: String,
        required: [true, "Location is required"],
    }
});

const Hospital = User.discriminator("Hospital", HospitalSchema);
export default Hospital;