import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { StudentModel } from '.';

const Schema = mongoose.Schema;

export type ActivityModel = BaseModel & {
    student: string | StudentModel
    content: string
    type: "add_point" | "custom" | "birthday"
}

const activitySchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student" },
    content: { type: String },
    type: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Activity: mongoose.Model<ActivityModel> = mongoose.model('Activity', activitySchema);




