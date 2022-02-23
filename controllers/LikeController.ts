/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao"
import LikeControllerI from "../interfaces/LikeControllerI";
import Like from "../models/likes/Like";

/**
 * @class LikeController Implements RESTful Web service API for likes resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>
 *         GET /api/likes to retrieve all the like documents for testing purpose
 *     </li>
 *     <li>
 *         GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>
 *         GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>
 *         POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>
 *         DELETE /api/users/:uid/unlikes/:tid to record that a user no longer likes a tuit
 *     </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing like CRUD operations
 * @property {LikeController} likeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @returns LikeController
     */
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

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user object
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then((likes: Like[]) => res.json(likes))

    /**
     * Retrieves all tuits that liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then((likes: Like[]) => res.json(likes));

    /**
     * Creates a new like instance to record that user likes a tuit
     * @param {Request} req Represents request from client, including the path
     * parameter tid and uid representing the tuit being liked and the user that
     * is liking the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new like that was inserted in
     * the database
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.tid, req.params.uid)
            .then((like: Like) => res.json(like))

    /**
     * Removes a like instance to record that user no longer likes the tuit
     * @param {Request} req Represents request from client, including the path
     * parameter tid and uid representing the tuit being unliked and the user is
     * unliking the tuit
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status))

    /**
     * Retrieves all likes from the database and returns an array of likes (including
     * all tuits being liked and users liking the tuit)
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the likes objects (including all
     * tuits being liked and users liking the tuit)
     */
    findAllLike = (req: Request, res: Response) =>
        LikeController.likeDao.findAllLike()
            .then((likes: Like[]) => res.json(likes));

}