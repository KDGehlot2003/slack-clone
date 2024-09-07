import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    createChannel,
    getChannel
} from "../controllers/channel.controller.js"

const router = Router()

router.use(isLoggedIn)

router.route("/").post(createChannel);
router.route("/:channelId").get(getChannel);


export default router