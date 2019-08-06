import * as mongoose from 'mongoose';
import { BaseModel } from './base';

const Schema = mongoose.Schema;

export type CourseModel = BaseModel & {
    name: string
    shortDescription: string
    description: string
    metaTitle: string
    metaDescription: string
    thumb: string
}

const courseSchema = new Schema({
    name: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    thumb: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Course: mongoose.Model<CourseModel> = mongoose.model('Course', courseSchema);


