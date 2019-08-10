import * as mongoose from 'mongoose';
import { BaseModel } from './base';

const Schema = mongoose.Schema;

export type RoomModel = BaseModel & {
    name: string
    description: string
    image: string

}

const roomSchema = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Room: mongoose.Model<RoomModel> = mongoose.model('Room', roomSchema);


