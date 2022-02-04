import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
const app = express();

mongoose.connect('mongodb://localhost:27017/tuiter');

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

UserController.getInstance(app);
TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);