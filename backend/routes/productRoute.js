import express from "express";
import { addProduct, allProduct, removeProduct } from "../controllers/productController.js";
import multer from "multer";
import fs from "fs";


const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(new Error("Unsupported file type"), false);
      }
    }
  });
  


  const uploadMiddleware = (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error("Multer Error: ", err);
        return res.status(400).json({ error: err.message });
      } else if (err) {
        console.error("Unknown Error: ", err);
        return res.status(500).json({ error: "An error occurred during file upload" });
      }
      next();
    });
  };

const productRouter = express.Router();

productRouter.post("/add", uploadMiddleware, addProduct);
productRouter.get("/list", allProduct);
productRouter.post("/remove", removeProduct);

export default productRouter;
