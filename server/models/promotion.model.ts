import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type PromotionModel = BaseModel & {

}

const promotionSchema = new Schema({
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Promotion: mongoose.Model<PromotionModel> = mongoose.model('Promotion', promotionSchema);




