import mongoose from "mongoose";
import Location from "../../models/users/Location";

const LocationSchema = new mongoose.Schema<Location>(
    {latitude: Number, longitude: Number})

export default LocationSchema