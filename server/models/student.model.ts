import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import { RankModel } from './rank.model';

import * as bcrypt from 'bcryptjs'
import { utilService } from '../services';

const SALT_WORK_FACTOR = 10

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
    cardId: string
    otherInfo: {
        [x: string]: any
    }
    password: string
}

const studentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"] },
    password: { type: String },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    avatar: { type: String },
    point: { type: Number, default: 0 },
    rank: { type: Schema.Types.ObjectId, ref: "Rank" },
    cardId: { type: String, unique: true },
    otherInfo: { type: Schema.Types.Mixed },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

studentSchema.pre('save', function (next) {
    var student = this as StudentModel

    // only hash the password if it has been modified (or is new)
    if (!student.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(student.password, salt, function (err, hash) {
            if (err) return next(err);
            student.password = hash;
            next();
        });
    });
});
studentSchema.pre('findOneAndUpdate', async function (next) {
    const dataUpdate = this.getUpdate()
    //  only hash the password if it has been modified (or is new)
    if (dataUpdate.password) {
        const hash = await utilService.hashPassword(dataUpdate.password)
        this.update({}, { password: hash })
    }
    next()
});



studentSchema.methods.comparePassword = async function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) reject(err)
            resolve(isMatch)
        })
    })
};

export let Student: mongoose.Model<StudentModel> = mongoose.model('Student', studentSchema);


