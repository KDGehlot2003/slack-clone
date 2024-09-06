import { Router } from "express";

import {
    createChannel,
    getChannel
} from "../controllers/channel.controller.js"

const router = Router()


router.route("/").post(createChannel);
router.route("/:channelId").get(getChannel);


export default router