import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeControllerI";
import Dislike from "../models/dislikes/Dislike";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";

export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get('/api/users/:uid/dislikes', DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.put('/api/users/:uid/dislikes/:tid', DislikeController.dislikeController.userTogglesTuitDislikes)
        }
        return DislikeController.dislikeController;
    }

    private constructor() {
    }

    findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === 'me' && profile ?
            profile._id : uid;

        try {
            DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
                .then((dislikes: Dislike[]) => res.json(dislikes))
        } catch (e) {
            res.sendStatus(403);
        }
    }

    userDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then((dislike: Dislike) => res.json(dislike));

    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const likeDao = DislikeController.likeDao;
        const tuitDao = DislikeController.tuitDao;
        const dislikeDao = DislikeController.dislikeDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === 'me' && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await likeDao.findUserLikesTuit(userId, tid);
            const userAlreadyDislikedTuit = await dislikeDao.findUserDislikesTuit(userId, tid);
            const howManyLikedTuit = await likeDao.countHowManyLikedTuit(tid);
            const howManyDislikedTuit = await dislikeDao.countHowManyDislikedTuit(tid);
            // console.log(howManyLikedTuit)
            // console.log(userId)
            let tuit = await tuitDao.findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await dislikeDao.userUnDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                if (userAlreadyLikedTuit) {
                    await likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }

                await dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
            }
            await tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            // console.log(e);
            res.sendStatus(404);
        }
    }


    userUnDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUnDislikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
}

