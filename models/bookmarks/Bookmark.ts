import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default interface Bookmark {
    tuit: Tuit,
    bookmarkedBy: User
}