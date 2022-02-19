import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao"
import LikeControllerI from "../interfaces/LikeControllerI";
import Like from "../models/likes/Like";

export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;

    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get('/api/users/:uid/likes', LikeController.likeController.findAllTuitsLikedByUser)
            app.get('/api/tuits/:tid/likes', LikeController.likeController.findAllUsersThatLikedTuit)
            app.post('/api/users/:uid/likes/:tid', LikeController.likeController.userLikesTuit)
            app.delete('/api/users/:uid/unlikes/:tid', LikeController.likeController.userUnLikesTuit)
            app.get('/api/likes', LikeController.likeController.findAllLike);
        }
        return LikeController.likeController;
    }

    private constructor() {}

    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then((likes: Like[]) => res.json(likes))

    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then((likes: Like[]) => res.json(likes));

    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.tid, req.params.uid)
            .then((like: Like) => res.json(like))

    userUnLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status))

    findAllLike = (req: Request, res: Response) =>
        LikeController.likeDao.findAllLike()
            .then((likes: Like[]) => res.json(likes));

}