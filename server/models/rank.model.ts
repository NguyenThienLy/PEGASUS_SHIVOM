import * as mongoose from 'mongoose';
import { BaseModel } from './base';

const Schema = mongoose.Schema;

export type RankModel = BaseModel & {
    name: string
    point: number
    iconLink: string
}

const rankSchema = new Schema({
    name: { type: String },
    point: { type: Number, default: 0 },
    iconLink: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Rank: mongoose.Model<RankModel> = mongoose.model('Rank', rankSchema);


