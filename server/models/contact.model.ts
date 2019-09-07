import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { CourseModel } from '.';

const Schema = mongoose.Schema;

export type ContactModel = BaseModel & {
    fullName: string
    email: string
    phone: string
    message: string
    address: string
    course: string | CourseModel
    isResponse: boolean
}

const contactSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    message: { type: String },
    address: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    isResponse: { type: Boolean },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Contact: mongoose.Model<ContactModel> = mongoose.model('Contact', contactSchema);


