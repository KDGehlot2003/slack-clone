import { asyncHandler } from "../utils/asyncHandler.js";
import {Channel} from "../models/channel.model.js"


const createChannel = asyncHandler( async (req,res) => {
    const {channelName} = req.body;

    if (!channelName) {
        return res.status(400).json({message: "Channel Name is required"})
    }

    if (channelName.length > 80) {
        return res.status(400).json({message: "Channel Name should not be more than 80 characters long"})
    }

    const user = req.cookies.user ; // User info saved during login

    const channel = await Channel.create({
        channelName,
        createdBy: user,
    })


    return res
    .status(201)
    .json({
        channel,
        message: "Channel created successfully"
    })

})

const getChannel = asyncHandler( async (req,res) => {
    const {channelId} = req.params

    const channel  =  await Channel.findById(channelId)

    if (!channel) {
        return res.status(404).json({message: "Channel not found"})
    }

    return res.status(201).json({channel, message: "Channel fetched Successfully"})
})


export {
    createChannel,
    getChannel
}