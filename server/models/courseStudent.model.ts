import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { StudentModel, PackageModel, ClassModel, CourseModel } from '.';

const Schema = mongoose.Schema;

export type CourseStudentModel = BaseModel & {
    student: string | StudentModel
    // package?: string | PackageModel
    course: string | CourseModel
    totalFeeAmount: number
    // totalDiscountAmount: number
    // totalMonth: number
    // totalLesson: number
    totalLessonUsed: number
    totalAbsent: number
    // bonus: number
    // totalAbsentPermitted: number
    startTime: Date
    endTime: Date
    isPayFee: boolean
    history: {
        type: "init" | "extend",
        time: Date
        monthAmount: number
        package: string
        fee: number
        isPayFee: boolean
    }[]
}

const courseStudentSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    // package: { type: Schema.Types.ObjectId, ref: "Package" },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    totalFeeAmount: { type: Number, required: true, default: 0 },
    // totalDiscountAmount: { type: Number, default: 0 },
    // totalMonthAmount: { type: Number, default: 0 },
    // totalLesson: { type: Number, default: 0 },
    totalLessonUsed: { type: Number, default: 0 },
    totalAbsent: { type: Number, default: 0 },
    // totalAbsentPermitted: { type: Number, default: 0 },
    // bonus: { type: Number, default: 0 },
    startTime: { type: Date },
    endTime: { type: Date },
    isPayFee: { type: Boolean, default: false },
    history: {
        type: [{
            type: { type: String, enum: ["init", "extend"], defaultValue: "init" },
            time: { type: Date },
            monthAmount: { type: Number },
            package: { type: String },
            fee: { type: Number },
            isPayFee: { type: Boolean }
        }]
    },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

courseStudentSchema.index({ student: 1, course: 1 }, { unique: true });

export let CourseStudent: mongoose.Model<CourseStudentModel> = mongoose.model('CourseStudent', courseStudentSchema);


