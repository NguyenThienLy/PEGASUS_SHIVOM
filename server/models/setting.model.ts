import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

export type SettingModel = BaseModel & {
    pointConfig: {
        feedback: number
    },
    logo: string
    contact: {
        brand: string
        title: string
        description: string
        phone: string
        hotline: string
        email: string
        address: string
        long: number
        lat: number
    }
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
    contact: {
        brand: { type: String },
        title: { type: String },
        description: { type: String },
        phone: { type: String },
        hotline: { type: String },
        email: { type: String },
        address: { type: String },
        long: { type: String },
        lat: { type: String }
    },
    email: {
        type: { type: String, hideJSON: true },
        port: { type: String, hideJSON: true },
        user: { type: String, hideJSON: true },
        pass: { type: String, hideJSON: true }
    },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Setting: mongoose.Model<SettingModel> = mongoose.model('Setting', settingSchema);




