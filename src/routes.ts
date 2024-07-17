import { Request, Response, Router } from "express";
import SensorController from "./controller/sensor.controller";

const sensorController = new SensorController;
const router = Router();

router.get("/readings", async (req: Request, res: Response) => {
    try {
        const response = await sensorController.findAllSensors();
        return res.status(response.code).json(response)
    } catch (error: any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})

router.get("/reading/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params as any
        const response = await sensorController.findSensorById(id);
        return res.status(response.code).json(response)
    } catch (error: any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})
router.post("/reading/save", async (req: Request, res: Response) => {
    try {
        const lector = req.body
        const response = await sensorController.saveSensor(lector);
        return res.status(response.code).json(response)
    } catch (error: any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})





export default router;