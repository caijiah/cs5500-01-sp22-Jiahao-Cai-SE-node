import Tuit from "../models/tuits/Tuit";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";

export default class TuitService {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitService: TuitService | null = null;

    public static getInstance = (): TuitService => {
        if (TuitService.tuitService === null) {
            TuitService.tuitService = new TuitService();
        }
        return TuitService.tuitService;
    }

    private constructor() {}

    findAllTuitsLoggedIn = async (uid: string): Promise<any> => {
        return TuitService.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => {
                tuits.forEach((t: any) => {
                    TuitService.likeDao.findUserLikesTuit(uid, t._id).then((liked)=> {
                        if (liked) {
                            t = {...t, likedByME: true};
                        }
                    })
                    if (t.postedBy._id === uid) {
                        t.ownedByMe = true;
                    }
                    return t
                })
            })
    }
}