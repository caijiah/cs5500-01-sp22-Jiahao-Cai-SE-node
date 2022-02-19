import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    findAllMessageSent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid})
            .populate('to')
            .exec()

    findAllMessageReceived = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid})
            .populate('from')
            .exec()

    userSendsMessage = async (message: Message, from: string, to: string): Promise<Message> =>
        MessageModel.create({...message, from, to})

    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    findAllMessage = async (): Promise<Message[]> =>
        MessageModel.find()
            .populate("to", {username: 1})
            .populate('from', {username: 1})
            .exec();
}