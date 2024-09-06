import { Router } from "express";
import {
    getChannelMessage,
    addMessage,
    deleteMessage,
    updateMessage
} from "../controllers/message.controller.js"

const router = Router()


router.route("/:channelId/messages").get(getChannelMessage).post(addMessage);
router.route("/c/:messageId").delete(deleteMessage).patch(updateMessage);


export default router