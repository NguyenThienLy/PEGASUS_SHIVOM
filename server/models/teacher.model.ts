import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { SkillModel } from './index.model';

const Schema = mongoose.Schema;

export type TeacherModel = BaseModel & {
    firstName: string
    lastName: string
    birthday: Date
    gender: "male" | "female"
    address?: string
    phone: string
    email: string
    avatar?: string
    otherInfo: {
        [x: string]: any
    }
    skills: string[] | SkillModel[]
}

const teacherSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"] },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    otherInfo: { type: Schema.Types.Mixed },
    skills: { type: [{ type: Schema.Types.ObjectId, ref: "Skill" }], default: [] },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Teacher: mongoose.Model<TeacherModel> = mongoose.model('Teacher', teacherSchema);


