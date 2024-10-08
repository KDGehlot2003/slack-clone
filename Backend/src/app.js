import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));
app.use(express.static('public'));
app.use(cookieParser())


// routes import 
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"
import channelRouter from "./routes/channel.routes.js"




//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/messages", messageRouter) // FIXME: Doubt
app.use("/api/v1/channels", channelRouter)





// http://localhost:8000/api/v1/users/register
export { app }