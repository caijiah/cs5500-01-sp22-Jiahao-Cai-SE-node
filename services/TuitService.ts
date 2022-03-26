import LikeDao from "../daos/LikeDao";
import DislikeDao from "../daos/DislikeDao";
import Tuit from "../models/tuits/Tuit";

export default class TuitService {
    public static tuitService: TuitService | null = null;
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    public static getInstance = (): TuitService => {
        if (TuitService.tuitService === null) {
            TuitService.tuitService = new TuitService();
        }
        return TuitService.tuitService;
    }

    private constructor() {}

    public fetchTuitsForLikesDisLikeOwn = async (userId: any, tuits: Tuit[]): Promise<any[]> => {
        let findLikesPromises: any[] = []
        let findDislikesPromises: any[] = []

        tuits.forEach((t: any) => {
            let findLikePromise = TuitService.likeDao.findUserLikesTuit(userId, t._id);
            let findDislikePromise = TuitService.dislikeDao.findUserDislikesTuit(userId, t._id);
            findLikesPromises.push(findLikePromise);
            findDislikesPromises.push(findDislikePromise);
        })
        const likedTuits = await Promise.all(findLikesPromises);
        const dislikedTuits = await Promise.all(findDislikesPromises);
        const likedTuitsIds = likedTuits.map((l) => {
            if (l) {
                return l.tuit.toString();
            }
        })
        const dislikedTuitsIds = dislikedTuits.map((l) => {
            if (l) {
                return l.tuit.toString();
            }
        })

        const fetchTuits = tuits.map((t: any) => {
            let copyT = t.toObject();
            if (likedTuitsIds.indexOf(t._id.toString()) >= 0) {
                copyT = {...copyT, likedByMe: true};
            }
            if (dislikedTuitsIds.indexOf(t._id.toString()) >= 0) {
                copyT = {...copyT, dislikedByMe: true};
            }
            if (copyT.postedBy._id.toString() === userId.toString()) {
                copyT = {...copyT, ownedByMe: true};
            }
            return copyT;
        })
        return fetchTuits;
    }
}