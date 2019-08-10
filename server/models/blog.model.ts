import * as mongoose from 'mongoose';
import { BaseModel } from './base';

const Schema = mongoose.Schema;

export type BlogModel =  BaseModel & {
    
    name: string,
    description?: string,
    coverImage?: string,

}

const blogSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    coverImage: { type: String }
},{ timestamps: true })

export let Blog: mongoose.Model<BlogModel> = mongoose.model('Blog', blogSchema);


