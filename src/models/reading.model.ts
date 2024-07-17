import mongoose, { Schema } from "mongoose";

const readingSchema: Schema = new Schema({
    firstSensor: {
        type: Number,
        required: true
    },
    secondSensor: {
        type: Number,
        required: true
    },
    thirdSensor: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
}, { collection: 'sensor' })

export default mongoose.model('sensors', readingSchema);