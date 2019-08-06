import * as mongoose from 'mongoose';
import { BaseModel } from './base';
import { StudentModel, PackageModel, ClassModel } from '.';

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
    absent: [{
        time: Date,
        reason: string
    }]
}

const classStudentSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    package: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    totalFeeAmount: { type: Number, required: true },
    totalDiscountAmount: { type: Number },
    totalMonthAmount: { type: Number },
    totalLesson: { type: Number },
    totalLessonUsed: { type: Number },
    totalAbsent: { type: Number },
    absent: [
        {
            time: { type: Date, required: true },
            reason: { type: String }
        }
    ],
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let ClassStudent: mongoose.Model<ClassStudentModel> = mongoose.model('ClassStudent', classStudentSchema);


