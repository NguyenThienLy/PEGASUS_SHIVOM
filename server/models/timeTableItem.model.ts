import * as mongoose from 'mongoose';
import { BaseModel } from './base';
import { RoomModel } from './room';

const Schema = mongoose.Schema;

export type TimeTableItemModel = BaseModel & {
    dayOfWeek: "monday" | "tuesday" | "webnesday" | "thursday" | "friday" | "saturday" | "sunday",
    startTime: Date
    endTime: Date
    room: string | RoomModel
}

const timeTableItemSchema = new Schema({
    dayOfWeek: {
        type: String, enum: ["monday", "tuesday", "webnesday", "thursday", "friday", "saturday", "sunday"], required: true
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let TimeTableItem: mongoose.Model<TimeTableItemModel> = mongoose.model('TimeTableItem', timeTableItemSchema);


