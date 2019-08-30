import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type TesmonialModel = BaseModel & {
    image: string
    content: string
    name: string
    address?: string
    phone?: string
}

const tesmonialSchema = new Schema({
    image: { type: String, required: true },
    content: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Tesmonial: mongoose.Model<TesmonialModel> = mongoose.model('Tesmonial', tesmonialSchema);




