import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { ClassModel } from './index.model';

const Schema = mongoose.Schema;

export type StatisticClassModel = BaseModel & {
    class: string | ClassModel
    type: "week" | "month" | "year"
    time: {
        week: number
        month: number
        year: number
    },
    totalAbsent: number
    totalStudent: number
    totalCorrect: number
    totalLate: number
}

const statisticClassSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: "Class" },
    type: { type: String, enum: ["week", "month", "year"] },
    time: {
        week: { type: Number },
        month: { type: Number },
        year: { type: Number }
    },
    totalAbsent: { type: Number },
    totalStudent: { type: Number },
    totalCorrect: { type: Number },
    totalLate: { type: Number },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let StatisticClass: mongoose.Model<StatisticClassModel> = mongoose.model('StatisticClass', statisticClassSchema);


