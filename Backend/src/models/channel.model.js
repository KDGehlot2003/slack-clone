import mongoose from "mongoose";

const channelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],

    },
    {
        timestamps: true
    }
)


export const Channel = mongoose.model("Channel", channelSchema)
