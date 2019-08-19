import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { StudentModel } from '.';

const Schema = mongoose.Schema;

export type StatisticStudentModel = BaseModel & {
    student: string | StudentModel
    type: "week" | "month" | "year"
    time: {
        week: number
        month: number
        year: number
    },
    absent: {
        class: string
        time: string
    }[]
    correct: {
        class: string
        time: string
    }[]
    wrong: {
        class: string
        time: string
    }
    delay: {
        class: string
        time: string
    }
}

const statisticStudentSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student" },
    type: { type: String, enum: ["week", "month", "year"] },
    time: {
        week: { type: Number },
        month: { type: Number },
        year: { type: Number }
    },
    absent: { type: [{ type: Schema.Types.Mixed }], default: [] },
    correct: { type: [{ type: Schema.Types.Mixed }], default: [] },
    wrong: { type: [{ type: Schema.Types.Mixed }], default: [] },
    delay: { type: [{ type: Schema.Types.Mixed }], default: [] },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let StatisticStudent: mongoose.Model<StatisticStudentModel> = mongoose.model('StatisticStudent', statisticStudentSchema);


