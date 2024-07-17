import config from "config";
import mongoose from "mongoose";
import logger from "./logger";

export default class MongoConn{

    private static _instance: MongoConn;

    public static get instance(){
        return this._instance || (this._instance = new this());
    }
    
    public async connectDB(){
        mongoose.set("strictQuery", false);
        mongoose.set("bufferCommands", true);
        try {
            await mongoose.connect(`${config.get('mongodb.url')}/${config.get("mongodb.database")}`)
            logger.info("Database connect correct")
        } catch (error) {
            logger.error(`Error connect to database: ${error}`)
        }
    }
    public async disconnectDB() {
        try {
            await mongoose.disconnect();
            logger.info("Database disconnect correct")
        } catch (error) {
            logger.error(`Error disconnect to database: ${error}`)
        }
    }

}