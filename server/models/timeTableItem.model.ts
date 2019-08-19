import * as mongoose from 'mongoose';
import { BaseModel } from './base';
import { RoomModel } from './room';

const Schema = mongoose.Schema;

export type TimeTableItemModel = BaseModel & {
    dayOfWeek: "monday" | "tuesday" | "webnesday" | "thursday" | "friday" | "saturday" | "sunday",
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
    room: string | RoomModel
}

const timeTableItemSchema = new Schema({
    dayOfWeek: {
        type: String, enum: ["monday", "tuesday", "webnesday", "thursday", "friday", "saturday", "sunday"], required: true
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
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })


timeTableItemSchema.pre('save', function (next) {
    var timeTableItem = this as TimeTableItemModel

    if (timeTableItem.isModified('startTime')){
        timeTableItem.startTime.number = timeTableItem.startTime.hour*60 + timeTableItem.startTime.minute
    }
    if (timeTableItem.isModified('endTime')){
        timeTableItem.endTime.number = timeTableItem.endTime.hour*60 + timeTableItem.endTime.minute
    }
    if (timeTableItem.isModified('startAvailableCheckinTime')){
        timeTableItem.startAvailableCheckinTime.number = timeTableItem.startAvailableCheckinTime.hour*60 + timeTableItem.startAvailableCheckinTime.minute
    }
    if (timeTableItem.isModified('endAvailabelCheckinTime')){
        timeTableItem.endAvailabelCheckinTime.number = timeTableItem.endAvailabelCheckinTime.hour*60 + timeTableItem.endAvailabelCheckinTime.minute
    }
    next()
});

export let TimeTableItem: mongoose.Model<TimeTableItemModel> = mongoose.model('TimeTableItem', timeTableItemSchema);


