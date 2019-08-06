import * as mongoose from 'mongoose';
import { BaseModel } from './base';

const Schema = mongoose.Schema;

export type {Name}Model = BaseModel & {

}

const {name}Schema = new Schema({
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let {Name}: mongoose.Model<{Name}Model> = mongoose.model('{Name}', {name}Schema);


