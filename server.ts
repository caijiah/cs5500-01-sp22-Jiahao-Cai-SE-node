import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";


const app = express();

dotenv.config();
app.use(cors());
const MONGODB_URI = "mongodb://localhost:27017/tuiter";
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI);

// configure HTTP body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);


const PORT = 4000;
app.listen(process.env.PORT || PORT);