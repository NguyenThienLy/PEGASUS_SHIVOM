import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { ClassModel, CourseModel, TimeTableItemModel } from '.';

const Schema = mongoose.Schema;

export type ClassTimeTableModel = BaseModel & {
    name: string
    class: string | ClassModel
    course: string | CourseModel
    items: string[] | TimeTableItemModel[]
}

const classTimeTableSchema = new Schema({
    name: { type: String },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    items: { type: [{ type: Schema.Types.ObjectId, ref: "TimeTableItem" }], default: [] },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let ClassTimeTable: mongoose.Model<ClassTimeTableModel> = mongoose.model('ClassTimeTable', classTimeTableSchema);


