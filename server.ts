/**
 * @file Implements an Express HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>follows</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
const session = require("express-session")

const app = express();

const CLIENT_ULR = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(cors({
    credentials: true,
    origin: CLIENT_ULR
}));

const SECRET = 'keyboard cat'
let sess = {
    secret: SECRET,
    cookie: {
        secure: false
    }
}

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

const MONGODB_URI = "mongodb://localhost:27017/tuiter";
// connect to the database
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI);


// configure HTTP body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);