import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeControllerI";
import Dislike from "../models/dislikes/Dislike";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";

export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();

        }
        return DislikeController.dislikeController;
    }

    private constructor() {}

    findAllTuitsDislikedByUser = (req: Request, res: Response): void => {
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

    userDislikesTuit = (req: Request, res: Response): void => {
    }

    userTogglesTuitDislikes = (req: Request, res: Response): void => {
    }

    userUnDislikesTuit = (req: Request, res: Response): void => {
    }


}