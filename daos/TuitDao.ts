import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";
import TuitModel from "../mongoose/tuits/TuitModel";

export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;
    public static getInstance(): TuitDao {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid).populate("postedBy").exec();

    createTuit = async (tuit: Tuit): Promise<Tuit> =>
        TuitModel.create(tuit);

    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid})

    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne({_id: tid}, {$set: tuit})

    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});
}