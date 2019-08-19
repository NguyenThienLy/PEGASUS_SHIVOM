import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type SkillModel = BaseModel & {
    name: string
    iconLink: string
}

const skillSchema = new Schema({
    name: { type: String, required: true },
    iconLink: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Skill: mongoose.Model<SkillModel> = mongoose.model('Skill', skillSchema);


