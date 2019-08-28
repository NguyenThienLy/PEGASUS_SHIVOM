import * as _ from 'lodash'
import * as moment from 'moment'
import * as hash from 'object-hash'

import { CrudController } from '../crud.controller'
import { studentService, ICrudOption, courseStudentService, classTimeTableService, errorService, classService, checkinService, mailService, tokenService, giftService, giftReceiveService, studentTimeTableService, cacheService } from '../../services'
import { CourseStudentModel, StudentModel, CourseModel, GiftModel, GiftReceiveModel, StudentTimeTableModel } from '../../models';
import { webhookController } from '..';
import { replyFeedbackEmail, remindExtendCourseEmail, notifyReceiveGiftEmail } from '../../mailTemplate';
import { ObjectID } from 'bson';


export class StudentController extends CrudController<typeof studentService>{
    constructor() {
        super(studentService);
    }
    async sendGift(params: {
        studentId: string
        gift: string
        amount: number
    }) {
        const timenow: string = moment().format()
        const gift: GiftModel = await giftService.getItem({
            filter: {
                _id: params.gift
            }
        })
        const student: StudentModel = await studentService.getItem({ filter: { _id: params.studentId }, fields: ["email", "firstName", "lastName", "point", "rank"] })
        const giftReceivedOfstudents: any = await giftReceiveService.model.aggregate([
            {
                $match: {
                    student: new ObjectID(params.studentId),
                    gift: new ObjectID(params.gift)
                }
            }, {
                $group: {
                    _id: "$student",
                    count: { $sum: "$amount" }
                }
            }
        ])

        // Kiem tra cac dieu kien de nhan qua
        if ((gift.amount - gift.used) < params.amount) {
            throw errorService.gift.giftNotEnough()
        } else if (gift.limit !== 0) {
            if (
                (giftReceivedOfstudents.length > 0 && gift.limit < (giftReceivedOfstudents[0].count + params.amount)) ||
                (gift.limit < params.amount)
            ) {
                throw errorService.gift.giftLimited()
            }
        } else if (gift.startTime && moment(gift.startTime).isAfter(timenow)) {
            throw errorService.gift.premature()
        } else if (gift.endTime && moment(gift.endTime).isBefore(timenow)) {
            throw errorService.gift.late()
        } else if (gift.condition.minPoint !== -1 && student.point < gift.condition.minPoint) {
            throw errorService.gift.notAchievedCondition()
        } else if (gift.condition.maxPoint !== -1 && student.point > gift.condition.maxPoint) {
            throw errorService.gift.notAchievedCondition()
        } else if (gift.condition.rank.length > 0 && gift.condition.rank.indexOf(student.rank as string) == -1) {
            throw errorService.gift.notAchievedCondition()
        } else if (gift.point * params.amount > student.point) {
            throw errorService.gift.notEnoughPoint()
        }
        const result: GiftReceiveModel = await giftReceiveService.model.findOneAndUpdate({ isReceived: false, student: params.studentId, gift: params.gift }, {
            $inc: { amount: params.amount },
            student: params.studentId,
            gift: params.gift
        }, {
                upsert: true,
                new: true
            })
        // Gửi mail toi nguoi dung

        try {

            const mailTemplate = await notifyReceiveGiftEmail.buildTemplate([student.email], {
                name: `${student.firstName} ${student.lastName}`,
                giftName: gift.name,
                amount: params.amount
            })
            mailService.sendMail({ mailOption: mailTemplate })
        } catch (err) {

        }
        return result
    }
    async updateCard(params: {
        studentId: string,
        code: string
    }) {
        return await this.service.update({
            cardId: params.code
        }, {
                filter: {
                    _id: params.studentId
                }
            })
    }
    async login(params: {
        phone: string
        password: string
    }) {
        const { phone, password } = params
        const student = await this.service.getItem({
            filter: {
                phone: phone
            }
        })
        const isMatch: boolean = await student.comparePassword(password)
        if (!isMatch) throw errorService.auth.permissionDenied()
        const token = await tokenService.getStudentToken({ _id: student._id })
        const json = student.toJSON()
        json.accessToken = token
        return json
    }
    async sendMailUpcommingExpired(params: {
        courseStudentIds: string[]
    }) {
        const { courseStudentIds } = params
        const listCourseStudents = await courseStudentService.model.find({
            _id: { $in: courseStudentIds }
        }).select(["_id"]).populate(["student", "course"])
        for (const listCourseStudent of listCourseStudents) {
            const mailTemplate = await remindExtendCourseEmail.buildTemplate([(listCourseStudent.student as StudentModel).email], {
                name: `${(listCourseStudent.student as StudentModel).firstName} ${(listCourseStudent.student as StudentModel).lastName}`,
                endDay: moment(listCourseStudent.endTime).format("DD-MM-YYYY"),
                courseName: (listCourseStudent.course as CourseModel).name
            })
            mailService.sendMail({ mailOption: mailTemplate })
        }
        return listCourseStudents
    }
    async getListStudentUpcommingExpired(params: {
        startTime?: string
        endTime?: string
    }, option: ICrudOption) {
        if (!params.startTime) params.startTime = moment().format()
        if (!params.endTime) params.endTime = moment().add(7, "days").format()
        const startDay = moment(params.startTime).dayOfYear()
        const endDay = moment(params.endTime).dayOfYear()
        return await courseStudentService.getList(_.merge(option, {
            filter: {
                endTime: { $gte: params.startTime, $lte: params.endTime }
            },
            populates: ["course", "student"]
        }))
    }
    async search(params: {
        phone: string
    }, option: ICrudOption) {
        return await this.service.getList(_.merge({
            filter: {
                phone: { $regex: params.phone, $options: "si" }
            }
        }, option))
    }
    async checkin(params: {
        studentId: string
    }) {
        const student: StudentModel = await this.service.getItem({
            filter: {
                _id: params.studentId
            }
        })
        const timestamps = moment().format("x")
        const result = await webhookController.checkStudentTimeTable({
            student, timestamps
        })
        return await checkinService.getItem({
            filter: {
                _id: result._id
            }, populates: ["course", "class", "timeTableItem"]
        })
    }
    async getListStudentUpcommingBirthday(params: {
        startTime?: string
        endTime?: string
    }, option: ICrudOption) {
        if (!params.startTime) params.startTime = moment().format()
        if (!params.endTime) params.endTime = moment().add(1, "months").format()
        const startDay = moment(params.startTime).dayOfYear()
        const endDay = moment(params.endTime).dayOfYear()
        const listStudent = await this.service.model.aggregate([
            {
                $project: {
                    day: { $dayOfYear: "$birthday" }
                }
            }, {
                $match: {
                    day: { $gte: startDay, $lte: endDay }
                }
            }
        ])
        return await this.service.getList(_.merge(option, {
            filter: {
                _id: { $in: listStudent.map((student: any) => { return student._id }) }
            }
        }))
    }
    async getListClassOfStudent(params: {
        studentId: string
    }, option: ICrudOption) {
        const coursesOfStudent = await courseStudentService.model.find({
            student: params.studentId
        })
        return await classService.getList({
            filter: { course: { $in: coursesOfStudent.map((courseOfStudent: CourseStudentModel) => { return courseOfStudent.course }) } }
        })
    }
    async getTimeTableOfStudentByCourse(params: {
        courseId: string
        studentId: string
    }, option: ICrudOption) {
        const hashCode = hash(JSON.stringify(_.merge(params, option)))
        // Lay du lieu trong cache
        const cacheData = await cacheService.get(hashCode)
        // Kiem tra cache co thi tra ve cache khong thi query lay va tao cache moi co thoi han
        if (cacheData) {
            return cacheData
        } else {
            const { courseId, studentId } = params

            // Kiem tra hoc vien co dang ky hoc khoa hoc do khong
            const courseOfStudent = await courseStudentService.model.findOne({
                student: studentId,
                course: courseId
            })
            if (!courseOfStudent) {
                throw errorService.student.courseHaventApplied()
            }
            const studentTimeTable: StudentTimeTableModel = await studentTimeTableService.getItem({
                filter: {
                    course: courseId,
                    student: studentId
                },
                // fields: ["_id items teacher class"],
                populates: [
                    {
                        path: "items",
                        select: "startTime endTime dayOfWeek",
                        populate: [{
                            path: "class",
                            select: "name",
                            populate: [{ path: "teacher", select: "firstName lastName" }]
                        }]
                    }
                ]
            })
            // Lay danh sach thoi khoa bieu cua hoc sinh theo mot khoa hoc nao do voi day du thong tin ve cac lop, giao vien cua lop
            // const { rows: classTimeTables } = await classTimeTableService.getList(_.merge({
            //     filter: {
            //         course: courseId
            //     },
            //     populates: [
            //         {
            //             path: "items",
            //             select: "startTime endTime dayOfWeek",

            //         }, {
            //             path: "class",
            //             select: "name",
            //             populate: [{ path: "teacher", select: "firstName lastName" }]
            //         }
            //     ]
            // }, option))
            function setCache() {
                cacheService.set(hashCode, studentTimeTable.toJSON(), { ttl: 3600 })
            }
            setCache()
            return studentTimeTable
        }
    }
    async getTimeTableOfStudent(params: {
        studentId: string
    }, option: ICrudOption) {
        const hashCode = hash(JSON.stringify(_.merge(params, option)))
        // Lay du lieu trong cache
        const cacheData = await cacheService.get(hashCode)
        // Kiem tra cache co thi tra ve cache khong thi query lay va tao cache moi co thoi han
        if (cacheData) {
            return cacheData
        } else {
            const { studentId } = params
            // Lay danh sach khoa hoc ma hoc vien co tham gia
            const coursesOfStudent = await courseStudentService.model.find({
                student: studentId
            })
            // Lay danh sach tat ca thoi khoa bieu cua hoc sinh voi day du thong tin ve cac lop, giao vien cua lop
            const { rows: studentTimeTables } = await studentTimeTableService.getList(_.merge({
                filter: {
                    course: coursesOfStudent.map((coursesOfStudent: CourseStudentModel) => { return coursesOfStudent.course })
                },
                populates: [
                    {
                        path: "course",
                        select: "name"
                    },
                    {
                        path: "items",
                        select: "startTime endTime dayOfWeek",
                        populate: [{
                            path: "class",
                            select: "name",
                            populate: [{ path: "teacher", select: "firstName lastName" }]
                        }]
                    }
                ]
            }, option))
            function setCache() {
                const studentTimeTableAsJson = studentTimeTables.map((item: any) => { return item.toJSON() })
                cacheService.set(hashCode, studentTimeTableAsJson, { ttl: 3600 })
            }
            setCache()
            return studentTimeTables
        }
    }

}