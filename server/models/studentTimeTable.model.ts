import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { ClassModel, CourseModel, TimeTableItemModel, StudentModel } from '.';

const Schema = mongoose.Schema;

export type StudentTimeTableModel = BaseModel & {
    course: string | CourseModel
    student: string | StudentModel
    items: string[] | TimeTableItemModel[]
}

const studentTimeTableSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    items: { type: [{ type: Schema.Types.ObjectId, ref: "TimeTableItem" }], default: [] },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let StudentTimeTable: mongoose.Model<StudentTimeTableModel> = mongoose.model('StudentTimeTable', studentTimeTableSchema);


