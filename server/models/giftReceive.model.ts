import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { StudentModel, GiftModel } from '.';

const Schema = mongoose.Schema;

export type GiftReceiveModel = BaseModel & {
    student: string | StudentModel
    gift: string | GiftModel
    amount: number
    receivedAt: Date
    image: string
    isReceived: boolean
}

const giftReceiveSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    gift: { type: Schema.Types.ObjectId, ref: "Gift", required: true },
    amount: { type: Number, default: 1 },
    receivedAt: { type: Date },
    isReceived: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let GiftReceive: mongoose.Model<GiftReceiveModel> = mongoose.model('GiftReceive', giftReceiveSchema);




