import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    getUserChannels
} from "../controllers/user.controller.js"


const router = Router()


router.route('/register').post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(isLoggedIn,logoutUser)
router.route("/channels").get(isLoggedIn,getUserChannels)
router.route("/:username").get(getUserProfile)


// router.get('/:userId/channels', getUserChannels); FIXME


export default router