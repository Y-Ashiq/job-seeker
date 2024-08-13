import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "./appError.js";

export const fileUpload = (fieldName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new AppError("pdf format only", 402));
    }
  };

  const upload = multer({ storage, fileFilter });

  return upload.single(fieldName);
};
