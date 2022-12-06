import jwt from "jsonwebtoken";
import userModel from "../Models/user.model.js"

const secret_key = process.env.JWT_SECRET_KEY;
export const auth = async(req,res,next)=> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if(isCustomAuth) {
            decodedData = jwt.verify(token,secret_key);
            req.userId = decodedData?.id;
        }else {
            decodedData = jwt.decode(token);
            const googleId = decodedData?.sub.toString();
            const user = await userModel.find({googleId});
            req.userId = user?._id;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}