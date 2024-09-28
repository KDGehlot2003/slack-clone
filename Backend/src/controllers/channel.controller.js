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


    const channel = await Channel.create({
        channelName,
        createdBy: req.user._id,
        users: [req.user._id]
    }).catch(error => {
        return res.status(500).json({ message: "Error creating channel", error });
    })

    //add the channel to the user's list of channels
    await User.findByIdAndUpdate(
        req.user._id,
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
    const {username, channelId} = req.params;

    const user = await User.findOne({username});

    if (!user) {
        return res.status(404).json({message: "user not found"})
    }

    const userId = user._id;

    const channel = await Channel.findById(channelId);

    if (!channel) {
        return res.status(404).json({message: "channel not found"})
    }

    if (channel.users.includes(userId)) {
        return res.status(400).json({message: "User already in channel"})
    }

    if(!user.channels.includes(channelId)) {
        user.channels.push(channelId)
        await user.save()
    }

    if (!channel.users.includes(userId)) {
        channel.users.push(userId)
        await channel.save()
    }

    return res.status(200).json({ message: "Joined channel successfully" });
})

const leaveChannel = asyncHandler( async (req,res) => {
    const {username, channelId} = req.params;

    const user = await User.findOne({username});

    if (!user) {
        return res.status(404).json({message: "user not found"})
    }

    const userId = user._id;

    const channel = await Channel.findById(channelId);

    if (!channel) {
        return res.status(404).json({message: "channel not found"})
    }

    if (!channel.users.includes(userId)) {
        return res.status(400).json({message: "User not in channel"})
    }

    user.channels = user.channels.filter(id => !id.equals(channelId))
    await user.save()

    channel.users = channel.users.filter(id => !id.equals(userId))
    await channel.save()

    return res.status(200).json({ message: "Left channel successfully" });
})

const getChannelUsers = asyncHandler( async (req,res) => {
    const {channelId} = req.params

    const channel = await Channel.findById(channelId).populate('users')

    if (!channel) {
        return res.status(404).json({message: 'channel not found'})
    }

    return res.status(200).json({
        users: channel.users,
        message: "Fetched channel users successfully"
    })
})


export {
    createChannel,
    getChannel,
    joinChannel,
    leaveChannel,
    getChannelUsers
}