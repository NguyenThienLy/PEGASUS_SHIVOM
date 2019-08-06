import * as mongoose from 'mongoose';
import { BaseModel } from './base';
import { CourseModel, TeacherModel } from '.';

const Schema = mongoose.Schema;

export type ClassModel = BaseModel & {
    course: string | CourseModel
    name: string
    code: string
    shortDescription: string
    description: string
    teacher: string[] | TeacherModel[]
    quantity: number
}

const classSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    name: { type: String, required: true },
    code: { type: String, unique: true },
    shortDescription: { type: String },
    description: { type: String },
    quantity: { type: Number, default: 0, required: true },
    teacher: { type: [{ type: Schema.Types.ObjectId, ref: "Teacher" }], default: [] },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Class: mongoose.Model<ClassModel> = mongoose.model('Class', classSchema);


