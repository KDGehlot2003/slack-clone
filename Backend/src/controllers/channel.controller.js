import { asyncHandler } from "../utils/asyncHandler.js";
import {Channel} from "../models/channel.model.js"
import {User} from "../models/user.model.js"


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
        createdBy: user._id,
        users: [user._id]
    }).catch(error => {
        return res.status(500).json({ message: "Error creating channel", error });
    })

    //add the channel to the user's list of channels
    await User.findByIdAndUpdate(
        user._id,
        { $push: {channels: channel._id}}
    ).catch(error => {
        return res.status(500).json({ message: "Error updating user with new channel", error });
    });


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

    return res.status(200).json({channel, message: "Channel fetched Successfully"})
})

const joinChannel = asyncHandler( async (req,res) => {
    
})

const leaveChannel = asyncHandler( async (req,res) => {

})

const getChannelUsers = asyncHandler( async (req,res) => {

})


export {
    createChannel,
    getChannel,
    joinChannel,
    leaveChannel,
    getChannelUsers
}