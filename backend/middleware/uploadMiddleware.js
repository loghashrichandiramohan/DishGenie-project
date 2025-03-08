import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Define Cloudinary storage with multiple formats allowed
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "dishgenie/recipes",
    format: async (req, file) => {
      const allowedFormats = ["jpg", "png", "webp"];
      const ext = file.mimetype.split("/")[1];
      return allowedFormats.includes(ext) ? ext : "jpg"; // Default to JPG if not recognized
    },
    transformation: [{ quality: "auto" }], // Optimize image quality
  },
});

// ✅ Multer file filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPG, PNG, WEBP) are allowed"), false);
  }
};

// ✅ Multer middleware with file size limit
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
