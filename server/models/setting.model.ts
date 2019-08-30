import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type SettingModel = BaseModel & {
    pointConfig: {
        feedback: number
    },
    logo: string
    contact: {
        branch: string
        description: string
        phone: string
        hotline: string
        email: string
        address: string
        long: number
        lat: number
    },
    email: {
        host: string
        post: number
        user: string
        pass: string
    }

}

const settingSchema = new Schema({
    pointConfig: {
        feedback: { type: Number, default: 0 }
    },
    logo: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Setting: mongoose.Model<SettingModel> = mongoose.model('Setting', settingSchema);




