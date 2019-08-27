import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { StudentModel, CourseModel, PackageModel } from '.';

const Schema = mongoose.Schema;

export type RegisCourseModel = BaseModel & {
    fullName: string
    phone: string
    address: string
    email?: string
    course: string | CourseModel
    isEnrolled: boolean
}

const regisCourseSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String },
    isEnrolled: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let RegisCourse: mongoose.Model<RegisCourseModel> = mongoose.model('RegisCourse', regisCourseSchema);


