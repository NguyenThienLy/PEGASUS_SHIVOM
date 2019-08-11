import * as mongoose from 'mongoose';
import { BaseModel } from './base';
import { RoomModel } from './room';

const Schema = mongoose.Schema;

export type TimeTableItemModel = BaseModel & {
    dayOfWeek: "monday" | "tuesday" | "webnesday" | "thursday" | "friday" | "saturday" | "sunday",
    startTime: {
        hour: number
        minute: number
    }
    endTime: {
        hour: number
        minute: number
    }
    startAvailableCheckinTime: {
        hour: number
        minute: number
    }
    endAvailabelCheckinTime: {
        hour: number
        minute: number
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
    },
    endTime: {
        hour: { type: Number },
        minute: { type: Number },
    },
    startAvailableCheckinTime: {
        hour: { type: Number },
        minute: { type: Number },
    },
    endAvailabelCheckinTime: {
        hour: { type: Number },
        minute: { type: Number },
    },
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

timeTableItemSchema.pre("find", function (next) {
    const timeTableItem = this as TimeTableItemModel
    this.startTime = {

    }
})

export let TimeTableItem: mongoose.Model<TimeTableItemModel> = mongoose.model('TimeTableItem', timeTableItemSchema);


