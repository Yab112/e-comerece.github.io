import mongoose, { mongo } from "mongoose";
import { MONGO_URI } from "./config.js";


export const connectDB = async () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });
};