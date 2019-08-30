import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { GalleryModel } from './gallery.model';

const Schema = mongoose.Schema;

export type MasonryHomeModel = BaseModel & {
    name: string
    description?: string
    images: string[] | GalleryModel[]
}

const masonryHomeSchema = new Schema({
    name: { type: String },
    description: { type: String },
    images: { type: [{ type: Schema.Types.ObjectId, ref: "Gallery" }], default: [] },
    status: { type: String, enum: ["active", "deactive"], default: "deactive" }
}, { timestamps: true })

export let MasonryHome: mongoose.Model<MasonryHomeModel> = mongoose.model('MasonryHome', masonryHomeSchema);




