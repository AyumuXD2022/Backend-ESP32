import logger from "../../lib/logger";
import MongoConn from "../../lib/mongodb";
import IReading from "../interfaces/reading.interface";
import IResponse from "../interfaces/response.interface";
import sensorModel from "../models/reading.model";

export default class SensorController {
    private mongodb: MongoConn;

    constructor() {
        this.mongodb = MongoConn.instance;
    }

    async findAllSensors(): Promise<IResponse> {
        try {
            await this.mongodb.connectDB()
            const findSensors = await sensorModel.find();
            return { ok: true, message: "Reading finds", response: findSensors, code: 200 };
        } catch (error) {
            logger.error(`[SensorController.findAllSensors] ${error}`)
            return { ok: false, message: "Error Ocurred", response: error, code: 500 };
        } finally {
            await this.mongodb.disconnectDB()
        }
    }
    async findSensorById(id:string): Promise<IResponse> {
        try {
            await this.mongodb.connectDB()
            const findSensor = await sensorModel.findById(id)
            if (findSensor){
                return { ok: true, message: "Reading find", response: findSensor, code: 200 };
            }else {
                return { ok: false, message: "Not found", response: null, code: 404 };
            }
        } catch (error) {
            logger.error(`[SensorController.findSensorById] ${error}`)
            return { ok: false, message: "Error Ocurred", response: error, code: 500 };
        }finally{
            await this.mongodb.disconnectDB()
        }
    }
    async saveSensor(reading:IReading): Promise<IResponse> {
        try {
            await this.mongodb.connectDB()
            const saveReading = await sensorModel.create(reading);
            return { ok: true, message: "Reading save", response: saveReading, code: 200 };
        } catch (error) {
            logger.error(`[SensorController.saveSensor] ${error}`)
            return { ok: false, message: "Error Ocurred", response: error, code: 500 };
        }finally{
            await this.mongodb.disconnectDB()
        }
    }
}