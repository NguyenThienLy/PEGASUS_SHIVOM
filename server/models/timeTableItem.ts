import * as mongoose from 'mongoose';
import { BaseModel } from './base';
import { TimeTableModel } from '.';

const Schema = mongoose.Schema;

export type TimeTableItemModel = BaseModel & {
    timeTable: string | TimeTableModel
    dayOfWeek: "monday" | "tuesday" | "webnesday" | "thursday" | "friday" | "saturday" | "sunday",
    startTime: Date
    endTime: Date

}

const timeTableItemSchema = new Schema({
    timeTable: { type: Schema.Types.ObjectId, ref: "TimeTable" },
    dayOfWeek: {
        type: String, enum: ["monday", "tuesday", "webnesday", "thursday", "friday", "saturday", "sunday"], required: true
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let TimeTableItem: mongoose.Model<TimeTableItemModel> = mongoose.model('TimeTableItem', timeTableItemSchema);


