import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type GalleryModel = BaseModel & {
    url: string
    alt: string
    description: string
}

const gallerySchema = new Schema({
    url: { type: String },
    alt: { type: String },
    description: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Gallery: mongoose.Model<GalleryModel> = mongoose.model('Gallery', gallerySchema);




