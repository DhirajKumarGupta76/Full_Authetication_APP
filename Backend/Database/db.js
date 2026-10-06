import mongoose from "mongoose";
import 'dotenv/config'
const connectDb=async()=>{
    try {
        // url and database name;
        await mongoose.connect(`${process.env.MONGO_URL}/authetication_01`);
        console.log("MongoDb is connected Successful")
        
    } catch (error) {
        console.log("MongoDb Connection Error",error);
         // Tell server startup that DB connection failed
        throw error;
        
    }
}
export default connectDb