import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

const verifyJWT = asyncHandler( async (req,res,next) => {
    try {
        
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ","");
        
        
        if (!token) {
            res.status(401).json({message:"Unauthorized"})
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        

        const user = await User.findById(decodedToken?._id)
        .select('-password -refreshToken ');

        if (!user) {
            res.status(401).json({message:"Invalid Access Token"})
        }


        req.user = user;
        next();
        
    } catch (error) {
        // console.log(error);
        
        res.status(401).json({message:"Unauthorized"})
    }
})

export default verifyJWT;