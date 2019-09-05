import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { GalleryModel } from './gallery.model';

const Schema = mongoose.Schema;

export type MasonryHomeModel = BaseModel & {
    name: string
    description?: string
    image: string
}

const masonryHomeSchema = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String, required: true },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let MasonryHome: mongoose.Model<MasonryHomeModel> = mongoose.model('MasonryHome', masonryHomeSchema);




