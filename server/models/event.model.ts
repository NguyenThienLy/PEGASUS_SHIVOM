import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type EventModel = BaseModel & {

}

const eventSchema = new Schema({
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Event: mongoose.Model<EventModel> = mongoose.model('Event', eventSchema);




