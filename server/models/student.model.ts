import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { RankModel } from './rank.model';

const Schema = mongoose.Schema;

export type StudentModel = BaseModel & {
    firstName: string
    lastName: string
    birthday: Date
    gender: "male" | "female"
    address: string
    phone: string
    email?: string
    avatar?: string
    point: number
    rank: string | RankModel
    otherInfo: {
        [x: string]: any
    }
}

const studentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"] },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    avatar: { type: String },
    point: { type: Number, default: 0 },
    rank: { type: Schema.Types.ObjectId, ref: "Rank" },
    otherInfo: { type: Schema.Types.Mixed },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Student: mongoose.Model<StudentModel> = mongoose.model('Student', studentSchema);


