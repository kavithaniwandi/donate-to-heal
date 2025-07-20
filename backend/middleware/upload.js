import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "donate_to_heal_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, crop: "limit" }],
  },
});

const upload = multer({ storage });
export default upload;