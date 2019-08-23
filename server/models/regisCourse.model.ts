import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { StudentModel, CourseModel, PackageModel } from '.';

const Schema = mongoose.Schema;

export type RegisCourseModel = BaseModel & {
    student: string | StudentModel
    course: string | CourseModel
    package: string | PackageModel
    totalMonth: number
    startTime: Date
    type: "new" | "extend"
}

const regisCourseSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    package: { type: Schema.Types.ObjectId, ref: "Package" },
    totalMonth: { type: Number },
    startTime: { type: Date, required: true },
    type: { type: String, enum: ["new", "extend"] },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let RegisCourse: mongoose.Model<RegisCourseModel> = mongoose.model('RegisCourse', regisCourseSchema);


