import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";
import userModel from "../mongoose/UserModel";

export default class UserDao implements UserDaoI {
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    async findUserById(uid: string): Promise<User> {
        return UserModel.findById(uid);
    }

    async createUser(user: User): Promise<User> {
        return await userModel.create(user);
    }

    async deleteUser(uid: string): Promise<any> {
        return userModel.deleteOne({_id: uid});
    }

    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }
}