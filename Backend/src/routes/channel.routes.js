import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    createChannel,
    getChannel,
    joinChannel,
    leaveChannel,
    getChannelUsers
} from "../controllers/channel.controller.js"

const router = Router()

router.use(isLoggedIn)

router.route("/").post(createChannel);
router.route("/:channelId").get(getChannel);
router.post('/:userId/:channelId/join', joinChannel);
router.post('/:userId/:channelId/leave', leaveChannel);
router.get('/:channelId/users', getChannelUsers);


export default router