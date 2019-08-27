import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';
import * as bcrypt from 'bcryptjs'
import { utilService } from '../services';

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema

export type AdminModel = BaseModel & {
    firstName: string
    lastName: string
    role: "admin" | "editor" | "teacher"
    username: string
    password: string
    avatar: string
}

const adminSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "teacher"] },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, hideJSON: true },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

adminSchema.pre('save', function (next) {
    var admin = this as AdminModel

    // only hash the password if it has been modified (or is new)
    if (!admin.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(admin.password, salt, function (err, hash) {
            if (err) return next(err);
            admin.password = hash;
            next();
        });
    });
});
adminSchema.pre('findOneAndUpdate', async function (next) {
    const dataUpdate = this.getUpdate()
    //  only hash the password if it has been modified (or is new)
    if (dataUpdate.password) {
        const hash = await utilService.hashPassword(dataUpdate.password)
        this.update({}, { password: hash })
    }
    next()
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) reject(err)
            resolve(isMatch)
        })
    })
};

export let Admin: mongoose.Model<AdminModel> = mongoose.model('Admin', adminSchema);


