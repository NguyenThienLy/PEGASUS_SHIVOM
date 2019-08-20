import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { StudentModel, PackageModel, ClassModel } from './index.model';

const Schema = mongoose.Schema;

export type ClassStudentModel = BaseModel & {
    student: string | StudentModel
    package: string | PackageModel
    class: string | ClassModel
    totalFeeAmount: number
    totalDiscountAmount: number
    totalMonth: number
    totalLesson: number
    totalLessonUsed: number
    totalAbsent: number
    bonus: number
    totalAbsentPermitted: number
}

const classStudentSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    package: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    totalFeeAmount: { type: Number, required: true, default: 0 },
    totalDiscountAmount: { type: Number, default: 0 },
    totalMonthAmount: { type: Number, default: 0 },
    totalLesson: { type: Number, default: 0 },
    totalLessonUsed: { type: Number, default: 0 },
    totalAbsent: { type: Number, default: 0 },
    totalAbsentPermitted: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let ClassStudent: mongoose.Model<ClassStudentModel> = mongoose.model('ClassStudent', classStudentSchema);


