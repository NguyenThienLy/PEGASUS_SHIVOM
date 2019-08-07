import * as mongoose from 'mongoose';
import { BaseModel } from './base';
import { ClassModel } from '.';
import { TimeTableItemModel } from './timeTableItem';

const Schema = mongoose.Schema;

export type TimeTableModel = BaseModel & {
    class: string | ClassModel
    items: string[] | TimeTableItemModel
}

const timeTableSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    items: { type: [{ type: Schema.Types.ObjectId, ref: "TimeTableItem" }], default: [] },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let TimeTable: mongoose.Model<TimeTableModel> = mongoose.model('TimeTable', timeTableSchema);


