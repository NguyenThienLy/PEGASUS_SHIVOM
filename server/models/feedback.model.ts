import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { StudentModel } from '.';

const Schema = mongoose.Schema;

export type FeedbackModel = BaseModel & {
    student: string | StudentModel
    content: string
    isReply: boolean
    repliedAt?: Date
    replyContent?: string
}

const feedbackSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    content: { type: String, required: true },
    isReply: { type: Boolean, default: false },
    repliedAt: { type: Date },
    replyContent: { type: String },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Feedback: mongoose.Model<FeedbackModel> = mongoose.model('Feedback', feedbackSchema);


