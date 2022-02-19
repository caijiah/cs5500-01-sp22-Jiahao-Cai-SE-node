import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
import Bookmark from "../models/bookmarks/Bookmark";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/api/users/:uid/unbookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get('/api/users/:uid/bookmarks', BookmarkController.bookmarkController.findAllTuitsLikedByUser);
            app.get('/api/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
            app.get('/api/bookmarks', BookmarkController.bookmarkController.findAllBookmark);
        }
        return BookmarkController.bookmarkController;
    }

    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsLikedByUser(req.params.uid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then((bookmark: Bookmark) => res.json(bookmark));

    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    findAllBookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmark()
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));
}