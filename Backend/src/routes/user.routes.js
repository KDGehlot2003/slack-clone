import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
} from "../controllers/user.controller.js"


const router = Router()


router.route('/register').post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(isLoggedIn,logoutUser)
router.route("/:username").get(getUserProfile)


export default router