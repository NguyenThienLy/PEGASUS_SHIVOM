import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type GiftModel = BaseModel & {
    name: string
    description: string
    image: string
    point: number
    amount: number
    limit: number
    used: number
    startTime: Date
    endTime: Date
    condition: {
        minPoint: number
        maxPoint: number
        rank: string[]
    }
}

const giftSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String },
    point: { type: Number, default: 0 },
    amount: { type: Number },
    limit: { type: Number },
    used: { type: Number, default: 0 },
    startTime: { type: Date },
    endTime: { type: Number },
    condition: {
        minPoint: { type: Number, default: -1 },
        maxPoint: { type: Number, default: -1 },
        rank: { type: [{ type: String }], default: [] },
    },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Gift: mongoose.Model<GiftModel> = mongoose.model('Gift', giftSchema);




