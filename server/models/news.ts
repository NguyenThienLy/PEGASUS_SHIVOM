import * as mongoose from 'mongoose';
import { BaseModel } from './base';
import { AdminModel, NewCategoryModel } from '.';

const Schema = mongoose.Schema;

export type NewsModel = BaseModel & {
    author: string | AdminModel
    category: string | NewCategoryModel
    title: string
    description: string
    slug: string
    metaTitle: string
    metaDescription: string
    content: string
    thumb: string

}

const newsSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    category: { type: Schema.Types.ObjectId, ref: "NewCategory", required: true },
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String },
    content: { type: String, required: true },
    thumb: { type: String, required: true },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let News: mongoose.Model<NewsModel> = mongoose.model('News', newsSchema);

