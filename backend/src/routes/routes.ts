import { Router } from "express";
import * as controller from "../controllers/controllers.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const route = Router();

route.post("/signup", controller.signUpPost);
route.post("/login", controller.signInPost);
route.post("/upload", upload.single("pdf"), controller.uploadPDF);

export default route;
