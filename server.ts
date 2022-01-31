import express from 'express';
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tuiter');

// configure HTTP body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

let userDao = new UserDao();
let userController = new UserController(app, userDao);

let tuitDao = new TuitDao();
let tuitController = new TuitController(app, tuitDao);

const PORT = 4000;
app.listen(process.env.PORT || PORT);