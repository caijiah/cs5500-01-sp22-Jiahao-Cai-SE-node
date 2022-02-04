import {Request, Response, Express} from "express";
import UserDAO from "../daos/UserDao"
import UserControllerI from "../interfaces/UserControllerI";
import UserDao from "../daos/UserDao";
import User from "../models/users/User";

export default class UserController implements UserControllerI {
    private static userDao: UserDAO = UserDao.getInstance();
    private static userController: UserController | null = null;
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/api/users', UserController.userController.findAllUsers);
            app.get('/api/users/:uid', UserController.userController.findUserById);
            app.post('/api/users', UserController.userController.createUser);
            app.delete('/api/users/:uid', UserController.userController.deleteUser);
            app.put('/api/users/:uid', UserController.userController.updateUser);
        }
        return UserController.userController;
    }

    private constructor() {}

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then((users: User[]) => res.json(users));

    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));

    createUser = (req: Request, res: Response) => {
        UserController.userDao.createUser(req.body)
            .then((user: User) => res.json(user));
    }

    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then(status => res.json(status))

    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status))
}