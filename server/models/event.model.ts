import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type EventModel = BaseModel & {
    payload: any
}

const eventSchema = new Schema({
    payload: {
        type: Schema.Types.Mixed
    },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Event: mongoose.Model<EventModel> = mongoose.model('Event', eventSchema);




