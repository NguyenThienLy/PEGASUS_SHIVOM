import * as _ from 'lodash'
import * as moment from 'moment'
import * as hash from 'object-hash'

import { CrudController } from '../crud.controller'
import { studentService, ICrudOption, courseStudentService, classTimeTableService, errorService, classService, checkinService, mailService, tokenService, giftService, giftReceiveService, studentTimeTableService, cacheService, utilService, packageService, courseService, statisticStudentService, activityService } from '../../services'
import { CourseStudentModel, StudentModel, CourseModel, GiftModel, GiftReceiveModel, StudentTimeTableModel, PackageModel, Promotion } from '../../models';
import { webhookController } from '..';
import { replyFeedbackEmail, remindExtendCourseEmail, notifyReceiveGiftEmail } from '../../mailTemplate';
import { ObjectID } from 'bson';

export class StudentController extends CrudController<typeof studentService>{
    constructor() {
        super(studentService);
    }
    async getListCourseOfStudent(params: {
        studentId: string
    }, option: ICrudOption) {
        const coursesOfStudent = await courseStudentService.model.find({
            student: params.studentId
        })
        return await courseService.getList({
            filter: { _id: { $in: coursesOfStudent.map((courseOfStudent: CourseStudentModel) => { return courseOfStudent.course }) } }
        })
    }
    async addPoint(params: {
        studentId: string
        point: number
        content: string
    }) {
        await activityService.create({
            student: params.studentId,
            type: "add_point",
            content: params.content
        })
        return await studentService.update({
            $inc: { point: params.point }
        }, {
            filter: {
                _id: params.studentId
            }
        })
    }
    async relearn(params: {
        studentId: string
        cardId: boolean
    }) {
        const tasks: Promise<any>[] = []

        tasks.push(studentService.update({
            status: "active",
            cardId: params.cardId
        }, {
            filter: {
                _id: params.studentId
            }
        }).then(result => {
            return result
        }))


        tasks.push(studentTimeTableService.update({
            status: "active"
        }, {
            filter: {
                student: params.studentId
            }
        }).then(result => {
            return result
        }))
        tasks.push(courseStudentService.update({
            status: "active"
        }, {
            filter: {
                student: params.studentId
            }
        }).then(result => {
            return result
        }))
        tasks.push(statisticStudentService.update({
            status: "active"
        }, {
            filter: {
                student: params.studentId
            }
        }).then(result => {
            return result
        }))
        try {
            const courseOfStudents = await courseStudentService.model.find({
                student: params.studentId
            })
            courseService.model.updateMany({

                _id: courseOfStudents.map((courseStudent: any) => { return courseStudent.course })

            }, {
                    $inc: {
                        currentStudentAmount: 1
                    }
                }, {
                    new: true, multi: true
                }).exec()
        } catch (err) {

        }
        return await Promise.all(tasks)
    }
    async leave(params: {
        studentId: string
        isRemoveCard: boolean
    }) {
        const tasks: Promise<any>[] = []
        if (params.isRemoveCard) {
            tasks.push(studentService.update({
                status: "deactive",
                cardId: null
            }, {
                filter: {
                    _id: params.studentId
                }
            }).then(result => {
                return result
            }))
        } else {
            tasks.push(studentService.update({
                status: "deactive"
            }, {
                filter: {
                    _id: params.studentId
                }
            }).then(result => {
                return result
            }))
        }

        tasks.push(studentTimeTableService.update({
            status: "deactive"
        }, {
            filter: {
                student: params.studentId
            }
        }).then(result => {
            return result
        }))
        tasks.push(courseStudentService.update({
            status: "deactive"
        }, {
            filter: {
                student: params.studentId
            }
        }).then(result => {
            return result
        }))
        tasks.push(statisticStudentService.update({
            status: "deactive"
        }, {
            filter: {
                student: params.studentId
            }
        }).then(result => {
            return result
        }))
        try {
            const courseOfStudents = await courseStudentService.model.find({
                student: params.studentId
            })
            courseService.model.updateMany({

                _id: courseOfStudents.map((courseStudent: any) => { return courseStudent.course })

            }, {
                    $inc: {
                        currentStudentAmount: - 1
                    }
                }, {
                    new: true, multi: true
                }).exec()
        } catch (err) {

        }
        return await Promise.all(tasks)
    }

    async enroll(params: {
        personalInfo: any
        courses: any[],
        isPayFee: boolean
    }) {
        const { personalInfo, courses, isPayFee = false } = params
        //const password = utilService.generateShortId(6)
        personalInfo.password = ""
        let results: any[] = []
        try {
            const student: StudentModel = await this.service.create(personalInfo)
            results.push(student)
            for (const course of courses) {
                let startTime = course.startTime || moment().format()
                let endTime
                let packageInfo: PackageModel
                let monthAmount
                const courseInfo: CourseModel = await courseService.getItem({ filter: { _id: course._id } })
                if (course.type === "package") {
                    packageInfo = await packageService.getItem({ filter: { _id: course.package } })
                    endTime = moment().add(packageInfo.monthAmount, "months").format()
                    monthAmount = packageInfo.monthAmount
                } else {
                    endTime = moment().add(course.monthAmount, "months").format()
                    monthAmount = course.monthAmount
                }
                if (monthAmount >= 3) {
                    try {
                        studentService.update({ $inc: { point: 10 } }, { filter: { _id: student._id } })
                        activityService.create({
                            student: student._id,
                            type: "enroll_course",
                            content: "Đăng ký học được cộng điểm"
                        })
                    } catch (err) {

                    }
                }
                const courseStudent: CourseStudentModel = await courseStudentService.create({
                    student: student._id,
                    course: course._id,
                    startTime: startTime,
                    endTime: endTime,
                    isPayFee: isPayFee,
                    history: [{
                        type: "init",
                        time: new Date(),
                        monthAmount: monthAmount,
                        package: course.package,
                        fee: course.type === "package" ? packageInfo.price : courseInfo.pricePerMonth * course.monthAmount,
                        isPayFee: params.isPayFee
                    }],
                    totalFeeAmount: course.type === "package" ? packageInfo.price : courseInfo.pricePerMonth * course.monthAmount,
                })
                results.push(courseStudent)
                const studentTimeTable: StudentTimeTableModel = await studentTimeTableService.create({
                    course: course._id,
                    student: student._id,
                    items: course.timeTables
                })
                results.push(studentTimeTable)
                courseInfo.update({ $inc: { currentStudentAmount: 1 } }).exec()
            }
            return student
        } catch (err) {
            results.forEach(result => {
                result.remove()
            })
            throw err
        }
    }
    async enrollToCourse(params: {
        studentId: string
        courseId: string
        startTime: string
        isPayFee: string
        type: string
        monthAmount: number
        packageId: string
        timeTableIds: string[]
    }) {
        const currentCourseStudent: CourseStudentModel = await courseStudentService.model.findOne({
            course: params.courseId,
            student: params.studentId
        })
        if (currentCourseStudent) {
            throw errorService.student.courseHaveApplied()
        }
        const courseInfo: CourseModel = await courseService.getItem({ filter: { _id: params.courseId } })
        let packageInfo: PackageModel
        let endTime: string
        let monthAmount: number
        let feeAmount
        if (params.type === "package") {
            packageInfo = await packageService.getItem({ filter: { _id: params.packageId } })
            endTime = moment(params.startTime).add(packageInfo.monthAmount, "months").format()
            monthAmount = packageInfo.monthAmount
            feeAmount = packageInfo.price
        } else {
            endTime = moment(params.startTime).add(params.monthAmount, "months").format()
            monthAmount = params.monthAmount
            feeAmount = params.monthAmount * courseInfo.pricePerMonth
        }
        if (monthAmount >= 3) {
            try {
                studentService.update({ $inc: { point: 10 } }, { filter: { _id: params.studentId } })
                activityService.create({
                    student: params.studentId,
                    type: "enroll_course",
                    content: "Đăng ký học được cộng điểm"
                })
            } catch (err) {

            }
        }
        const courseStudent: CourseStudentModel = await courseStudentService.create({
            student: params.studentId,
            course: params.courseId,
            startTime: params.startTime,
            endTime: endTime,
            totalFeeAmount: params.type === "package" ? packageInfo.price : courseInfo.pricePerMonth * params.monthAmount,
            isPayFee: params.isPayFee,
            history: [{
                type: "init",
                time: new Date(),
                monthAmount: monthAmount,
                package: params.packageId,
                fee: feeAmount,
                isPayFee: params.isPayFee
            }]
        })
        const studentTimeTable: StudentTimeTableModel = await studentTimeTableService.create({
            course: params.courseId,
            student: params.studentId,
            items: params.timeTableIds
        })
        courseInfo.update({ $inc: { currentStudentAmount: 1 } }).exec()
        return {
            courseStudent, studentTimeTable
        }
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
        // const startDay = moment(params.startTime).dayOfYear()
        // const endDay = moment(params.endTime).dayOfYear()
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
        const timestamps = moment().unix()
        const result = await webhookController.checkStudentTimeTable({
            student, timestamps, isFromAdmin: true
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

        const today = moment(params.startTime).toDate();
        const listStudent = await studentService.model.aggregate([{
            $addFields: {
                today: { $dateFromParts: { year: { $year: today }, month: { $month: today }, day: { $dayOfMonth: today } } },
                birthdayThisYear: { $dateFromParts: { year: { $year: today }, month: { $month: "$birthday" }, day: { $dayOfMonth: "$birthday" } } },
                birthdayNextYear: { $dateFromParts: { year: { $add: [1, { $year: today }] }, month: { $month: "$birthday" }, day: { $dayOfMonth: "$birthday" } } }
            }
        }, {
            $addFields: {
                nextBirthday: { $cond: [{ $gte: ["$birthdayThisYear", "$today"] }, "$birthdayThisYear", "$birthdayNextYear"] }
            }
        }, {
            $project: {
                name: 1,
                birthday: 1,
                daysTillNextBirthday: {
                    $divide: [
                        { $subtract: ["$nextBirthday", "$today"] },
                        24 * 60 * 60 * 1000  /* milliseconds in a day */
                    ]
                },
                _id: 1
            }
        }, {
            $match: {
                daysTillNextBirthday: { $gte: 0, $lt: 30 }
            }
        }, { $sort: { daysTillNextBirthday: 1 } }]);
        const studentIds = listStudent.map((student: any) => { return student._id })
        const students = await this.service.getList(_.merge(option, {
            filter: {
                _id: { $in: listStudent.map((student: any) => { return student._id }) }
            }
        }))
        const sortedStudent = listStudent.map((student: any) => {
            return students.rows.find(item => { return item._id.toString() === student._id.toString() })
        })
        return {
            rows: sortedStudent,
            count: students.count
        }
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
                        select: "startTime endTime dayOfWeek topic",
                        match: { status: "active" },
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
                        select: "startTime endTime dayOfWeek topic",
                        match: { status: "active" },
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
    async statisticForColumnChart(params: {
        course: string,
        startTime: Date,
        endTime: Date
    }) {
        // Lay ma hash duy nhat de query cache
        const hashCode = hash(JSON.stringify(params))
        // Lay du lieu trong cache
        const cacheData = await cacheService.get(hashCode)

        if (cacheData) {
            return cacheData
        } else {
            const { course, startTime, endTime } = params

            // Đổi sang tuần theo type
            const totalWeekStartTime = moment(startTime).month() * 4 + moment(startTime).year() * 52
            const totalWeekEndTime = moment(endTime).month() * 4 + moment(endTime).year() * 52

            // // Thống kê theo kiểu realTime
            // if (type === "realTime")
            //     return checkinService.getDataInStatisticForListDetail({
            //         course
            //     })

            // Thống kê theo kiểu week, month, year
            return this.service.getDateInStatisticForColumnChart({
                course,
                totalWeekStartTime,
                totalWeekEndTime
            })
        }
    }
}