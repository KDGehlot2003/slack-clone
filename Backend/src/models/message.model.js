import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        channelId: {
            type: Schema.Types.ObjectId,
            ref: "Channel"
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)