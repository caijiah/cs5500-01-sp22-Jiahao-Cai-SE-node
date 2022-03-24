/**
 * @file Declares Controller RESTful Web service API for users authentication.
 */
import {Request, Response} from "express";

export default interface AuthenticationControllerI {
    login(req: Request, res: Response): void;
    register(req: Request, res: Response): void;
    profile(req: Request, res: Response): void;
    logout(req: Request, res: Response): void;
}