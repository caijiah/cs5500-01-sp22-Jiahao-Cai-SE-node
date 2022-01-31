import mongoose from "mongoose";
import Location from "../models/Location";
import AccountType from "../models/AccountType";
import MaritalStatus from "../models/MaritalStatus";
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: AccountType.Personal, enum: AccountType},
    maritalStatus: {type: String, default: MaritalStatus.Single, enum: MaritalStatus},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: new mongoose.Schema<Location>({latitude: Number, longitude: Number})
}, {collection: 'users'});

export default UserSchema;
