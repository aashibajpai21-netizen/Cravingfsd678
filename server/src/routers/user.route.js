import express from "express";
import multer from "multer";
import { EditUserProfile} from "../controllers/user.controller.js";
import { AuthProtect } from "../middlewares/auth.middelware.js";

const upload = multer();
const router =  express.Router();

router.put(
    "/edit-profile",
    AuthProtect,
    upload.single("displayPic"),
    EditUserProfile,
);
export default router;