import { asyncHandler } from "../utils/asyncHandler.js";
import {Message} from "../models/message.model.js"


const getChannelMessage = asyncHandler( async (req,res) =>  {
    const {channelId} = req.params;

    const messages = await Message.find({
        channelId
    })

    return res.status(200).json({messages, message: "Messages fetch successfully"})
})

const addMessage = asyncHandler( async (req,res) =>  {
    const {channelId} = req.params;
    const {message} = req.body;

    

    if (!channelId)  {
        return res.status(400).json({message: "Channel required"})
    }
    
    if (!message) {
        return res.status(400).json({message: "message is required"})
    }

    const createdmessage = await Message.create({
        message,
        sender: req.user._id,
        username: req.user.username,
        channelId
    })

    if (!createdmessage) {
        return res.status(401).json({message: "something went wrong while creating message"})
    }

    return res.status(201).json({
        createdmessage,
        message: "Message Created successfully"
    })

})

const deleteMessage = asyncHandler( async (req,res) =>  {
    const {channelId, messageId} = req.params;

    const message = await Message.findById(messageId)

    if (message.sender.toString() !== req.user._id.toString()) {
        return res.status(401).json({message: "You are not authorized to delete this message"})
    }

    if (!message) {
        return res.status(404).json({message: "message not found"})
    }

    const deleteMessage = await Message.findByIdAndDelete(messageId)
    

    return res.status(204).json({message: "message deleted Successfully"})
})

const updateMessage = asyncHandler( async (req,res) =>  {
    const {messageId} = req.params;
    const {message} = req.body;

    if (!message) {
        return res.status(400).json({message: "message required"})
    }

    // sender who created the message can only update the message

    const fetchedMessage = await Message.findById(messageId)

    if (fetchedMessage.sender.toString() !== req.user._id.toString()) {
        return res.status(401).json({message: "You are not authorized to update this message"})
    }

    if (!fetchedMessage) {
        return res.status(404).json({message: "message not found"})
    }

    const updatedMessage  = await Message.findByIdAndUpdate(messageId,{message}, {new: true})

    if (!updatedMessage) {
        return res.status(400).json({message: "Something went wrong while creating message"})
    }

    return res.status(201).json({updatedMessage,
        message: "Message updated Successfully"
    })

})


export {
    getChannelMessage,
    addMessage,
    deleteMessage,
    updateMessage
}