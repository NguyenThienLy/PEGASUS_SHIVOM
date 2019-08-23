import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { CourseModel } from '.';

const Schema = mongoose.Schema;

export type StatisticCourseModel = BaseModel & {
    course: string | CourseModel
    type: "week" | "month" | "year"
    time: {
        week: number
        month: number
        year: number
    },
    totalAbsent: number
    totalStudent: number
    totalOnTime: number
    totalLate: number
    totalRedundant: number
}

const statisticCourseSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    type: { type: String, enum: ["week", "month", "year"] },
    time: {
        week: { type: Number },
        month: { type: Number },
        year: { type: Number }
    },
    totalAbsent: { type: Number, default: 0 },
    totalStudent: { type: Number, default: 0 },
    totalOnTime: { type: Number, default: 0 },
    totalLate: { type: Number, default: 0 },
    totalRedundant: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let StatisticCourse: mongoose.Model<StatisticCourseModel> = mongoose.model('StatisticCourse', statisticCourseSchema);


