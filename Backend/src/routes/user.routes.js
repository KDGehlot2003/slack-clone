import { Router } from "express";
// import isLoggedIn from "../middlewares/isLoggedIn.js";
import verifyJWT from "../middlewares/auth.middleware.js";
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
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/channels").get(verifyJWT,getUserChannels)
router.route("/").get(verifyJWT,getUserProfile)


// router.get('/:userId/channels', getUserChannels); FIXME


export default router