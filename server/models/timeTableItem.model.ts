import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { RoomModel } from './room.model';
import { ClassModel } from '.';

const Schema = mongoose.Schema;

export type TimeTableItemModel = BaseModel & {
    dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
    startTime: {
        hour: number
        minute: number
        number: number
    }
    endTime: {
        hour: number
        minute: number
        number: number
    }
    startAvailableCheckinTime: {
        hour: number
        minute: number
        number: number
    }
    endAvailabelCheckinTime: {
        hour: number
        minute: number
        number: number
    }
    class: string | ClassModel
    room: string | RoomModel
    topic: string
}

const timeTableItemSchema = new Schema({
    dayOfWeek: {
        type: String, enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], required: true
    },
    startTime: {
        hour: { type: Number },
        minute: { type: Number },
        number: { type: Number },
    },
    endTime: {
        hour: { type: Number },
        minute: { type: Number },
        number: { type: Number },
    },
    startAvailableCheckinTime: {
        hour: { type: Number },
        minute: { type: Number },
        number: { type: Number },
    },
    endAvailabelCheckinTime: {
        hour: { type: Number },
        minute: { type: Number },
        number: { type: Number },
    },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    topic: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })


timeTableItemSchema.pre('save', function (next) {
    var timeTableItem = this as TimeTableItemModel
    if (timeTableItem.isModified('startTime')) {
        timeTableItem.startTime.number = timeTableItem.startTime.hour * 60 + timeTableItem.startTime.minute
    }
    if (timeTableItem.isModified('endTime')) {
        timeTableItem.endTime.number = timeTableItem.endTime.hour * 60 + timeTableItem.endTime.minute
    }
    if (timeTableItem.isModified('startAvailableCheckinTime')) {
        timeTableItem.startAvailableCheckinTime.number = timeTableItem.startAvailableCheckinTime.hour * 60 + timeTableItem.startAvailableCheckinTime.minute
    }
    if (timeTableItem.isModified('endAvailabelCheckinTime')) {
        timeTableItem.endAvailabelCheckinTime.number = timeTableItem.endAvailabelCheckinTime.hour * 60 + timeTableItem.endAvailabelCheckinTime.minute
    }
    next()
});

export let TimeTableItem: mongoose.Model<TimeTableItemModel> = mongoose.model('TimeTableItem', timeTableItemSchema);


