import { asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
// import {ApiError} from "../utils/ApiError.js"
// import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler( async (req,res) => {
    const { fullName, email, username, password} = req.body;

    if (!fullName || !email || !username || ! password) {
        return res.status(400).json({message: "All fields required"})
    }

    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({message: "Username should be between 3 and 20 characters long"})
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({message: "Invalid email address"})
    }

    if (password.length < 6) {
        return res.status(400).json({message: "Password should be at least 6 characters long"})
    } 

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        return res.status(409).json({message: "User with email or username already exists"})
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password
    })
    
    const createdUser = await User.findById(user._id).select(' -password ')

    if (!createdUser) {
        return res.status(500).json({message: "Something went wrong while registering the user"})
    }

    return res.status(201).json({
        user: createdUser,
        message: "User register Successfully..."
    })
})

const loginUser = asyncHandler( async (req,res) => {
    const { username, email, password } = req.body;
    
    if (!(username || email)) {
        return res.status(400).json({message: "username or email is required"})
    }

    if (!password) {
        return res.status(400).json({message: "Password is required"})
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    if (!user) {
        return res.status(404).json({message: "User does not exist"})
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        return res.status(401).json({message: "Invalid user credentials"})
    }

    const loggedInUser = await User.findById(user._id).select('-password')

    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }

    return res
    .status(201)
    .json({
        user: loggedInUser,
        message: "User logged In Successfully..."
    })

})

const logoutUser = asyncHandler( async (req,res) => {
    
})

const getUserProfile = asyncHandler( async (req,res) => {

})

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
}