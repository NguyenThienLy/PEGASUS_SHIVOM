import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { AdminModel, NewCategoryModel } from '.';
import { SliderModel } from './slider.model';

const Schema = mongoose.Schema;

export type NewsModel = BaseModel & {
    author: string | AdminModel
    category: string | NewCategoryModel
    title: string
    description: string
    slug: string
    tags: string[]
    metaTitle: string
    metaDescription: string
    content: string
    thumb: string
    isUseAtSlider: boolean
    isPin: boolean
    slider: string | SliderModel
    view: number
}

const newsSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    category: { type: Schema.Types.ObjectId, ref: "NewCategory", required: true },
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    tags: { type: [{ type: String }], default: [] },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String },
    content: { type: String, required: true },
    thumb: { type: String, required: true },
    slider: { type: Schema.Types.ObjectId, ref: "Slider" },
    isUseAtSlider: { type: Boolean, default: false },
    isPin: { type: Boolean, default: false },
    view: { type: Number, default: 0, required: true },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let News: mongoose.Model<NewsModel> = mongoose.model('News', newsSchema);


