import mongoose from "mongoose";
import {ENV} from "./env.js";


export const connectDB = async() =>{
    try {
        
        const conn = await mongoose.connect(ENV.MONGO_URI)
    } catch (error) {
        process.exit(1); 
    }
}
