import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import tuitModel from "../mongoose/UserModel";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return tuitModel.find();
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return tuitModel.find({postedBy: uid});
    }

    async findTuitById(tid: string): Promise<Tuit> {
        return tuitModel.findById(tid);
    }

    async createTuit(tuit: Tuit): Promise<Tuit> {
        return tuitModel.create(tuit);
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return tuitModel.updateOne({_id: tid}, {$set: tuit})
    }

    async deleteTuit(tid: string): Promise<any> {
        return tuitModel.deleteOne({_id: tid})
    }
}