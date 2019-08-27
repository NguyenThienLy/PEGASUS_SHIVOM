import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type GiftModel = BaseModel & {

}

const giftSchema = new Schema({
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Gift: mongoose.Model<GiftModel> = mongoose.model('Gift', giftSchema);




