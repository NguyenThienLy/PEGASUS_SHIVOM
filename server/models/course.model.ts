import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type CourseModel = BaseModel & {
    name: string
    slug: string
    shortDescription: string
    description: string
    metaTitle: string
    metaDescription: string
    thumb: string
    benefits: string[]
}

const courseSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    shortDescription: { type: String },
    description: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    thumb: { type: String },
    benefits: { type: [{ type: String }], default: [] },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Course: mongoose.Model<CourseModel> = mongoose.model('Course', courseSchema);


