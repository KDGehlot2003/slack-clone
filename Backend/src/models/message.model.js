import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel"
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Message = mongoose.model("Message",messageSchema)