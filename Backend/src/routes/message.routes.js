import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    getChannelMessage,
    addMessage,
    deleteMessage,
    updateMessage
} from "../controllers/message.controller.js"

const router = Router()

router.use(isLoggedIn)


router.route("/:channelId/messages").get(getChannelMessage).post(addMessage);
router.route("/:channelId/:messageId").delete(deleteMessage).patch(updateMessage);


export default router