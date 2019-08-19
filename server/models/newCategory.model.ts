import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type NewCategoryModel = BaseModel & {
    name: string
    description: string
    thumb?: string
}

const newCategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    thumb: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let NewCategory: mongoose.Model<NewCategoryModel> = mongoose.model('NewCategory', newCategorySchema);


