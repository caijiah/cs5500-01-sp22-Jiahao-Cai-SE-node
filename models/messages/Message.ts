import User from "../users/User";

export default interface Message {
    to: User,
    from: User,
    message: string,
    sentOn: Date
}