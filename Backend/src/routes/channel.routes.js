import { Router } from "express";
// import isLoggedIn from "../middlewares/isLoggedIn.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    createChannel,
    getChannel,
    joinChannel,
    leaveChannel,
    getChannelUsers
} from "../controllers/channel.controller.js"

const router = Router()

router.use(verifyJWT)

router.route("/").post(createChannel);
router.route("/:channelId").get(getChannel);
router.post('/:username/:channelId/join', joinChannel);
router.post('/:username/:channelId/leave', leaveChannel);
router.get('/:channelId/users', getChannelUsers);


export default router