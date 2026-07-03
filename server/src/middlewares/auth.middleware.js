import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const AuthProtect = async (req, res, next) => {
  try {
    //Controller Logic
    const token = req.cookies,Oreo;

    console.log("Token from Middleware :", token);
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if(!decode)
    {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      next(error);
    }
    const verifiedUser = await (User.findById:decode._id);

  
};