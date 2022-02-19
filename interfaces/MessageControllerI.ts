import {Request, Response} from "express";
import Message from "../models/messages/Message";

export default interface MessageControllerI {
    userSendsMessage(req: Request, res: Response): void;
    userDeletesMessage(req: Request, res: Response): void;
    findAllMessageSent(req: Request, res: Response): void;
    findAllMessageReceived(req: Request, res: Response): void;
    findAllMessage(req: Request, res: Response): void;
}