import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { ClassModel, CourseModel } from '.';

const Schema = mongoose.Schema;

export type PackageModel = BaseModel & {
    name: string
    monthAmount: number
    type: string
    price: number
    discount: [
        {
            type: string
            condition: string
            amount: number
        }
    ]
    course: string | CourseModel
}

const packageSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    name: { type: String },
    monthAmount: { type: Number },
    type: { type: String },
    price: { type: String },
    discount: [{
        type: { type: String },
        condition: { type: String },
        amount: { type: Number }
    }],
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Package: mongoose.Model<PackageModel> = mongoose.model('Package', packageSchema);


