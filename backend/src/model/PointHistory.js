import mongoose, { Schema } from 'mongoose';
import { type } from 'os';

const historySchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pointsClaimed: {
        type: Number,
        required: true
    }

}, { timestamps: true })

export const PointsHistory = mongoose.model("PointsHistory", historySchema)
