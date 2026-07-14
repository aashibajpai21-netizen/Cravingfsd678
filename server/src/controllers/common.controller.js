import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";
import bcrypt from "bcrypt";

export const EditUserProfile = async (req,resizeBy,next) => {
    try {
        const {email,fullName,phone}=req.body;
        const newPhoto = req.file;

        console.log("Req Body :", req.body);
        console.log("Req File: ", req.file);
        if(!email || !fullName || !phone){
            const error = new Error("All Fields Required");
            error.statusCode = 404;
            return next(error);
        }

        if(newPhoto){
            existingUser?.photo?.publicId && ( await cloudinary.uploader.destroy(existingUser.photo.publicId));
            const b64=Buffer.from(newPhoto.buffer).toString("base64");
            const dataURI=`data:$(newPhoto.mimetype);base64,${b64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "Cravings678/profile",
                width: 500,
                height: 500,
                crop: "fill",
            });
            console.log(result)
        }

    }
}