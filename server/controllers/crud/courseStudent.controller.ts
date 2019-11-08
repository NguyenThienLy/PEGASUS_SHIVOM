import { CrudController } from '../crud.controller'
import { courseStudentService, courseService, packageService, studentService, activityService, studentTimeTableService, errorService } from '../../services/index'
import { CourseStudentModel, CourseModel, PackageModel, StudentModel } from '../../models';

import * as moment from 'moment'

export class CourseStudentController extends CrudController<typeof courseStudentService>{
    constructor() {
        super(courseStudentService);
    }
    async relearn(params: {
        courseStudentId: string,
        monthAmount: number,
        isPayFee: boolean,
        type: "package" | "monthAmount",
        package: string,
        startTime: string
    }) {
        const courseStudentInfo: CourseStudentModel = await this.service.getItem({
            filter: {
                _id: params.courseStudentId
            },
            populates: [
                {
                    path: "course"
                },
                {
                    path: "student",
                    select: "firstName lastName"
                }
            ]
        })
        if (courseStudentInfo.status === "active") {
            throw errorService.courseStudent.haveLearning()
        }
        let packageInfo: PackageModel
        let endTime: string
        let monthAmount: number
        let feeAmount: number
        let endTimeOfCourseStudent = courseStudentInfo.endTime
        // let timenow = moment().format()
        if (moment(moment().format()).isAfter(courseStudentInfo.endTime)) {
            endTimeOfCourseStudent = moment().toDate()
        }
        if (params.type === "package") {
            packageInfo = await packageService.getItem({ filter: { _id: params.package } })
            feeAmount = packageInfo.price
            endTime = moment(params.startTime).add(packageInfo.monthAmount, "months").format()
            monthAmount = packageInfo.monthAmount
        } else {
            endTime = moment(params.startTime).add(params.monthAmount, "months").format()
            monthAmount = params.monthAmount
            feeAmount = (courseStudentInfo.course as CourseModel).pricePerMonth * params.monthAmount
        }
        if (monthAmount >= 3) {
            try {
                studentService.update({ $inc: { point: 10 } }, { filter: { _id: courseStudentInfo.student } })
                activityService.create({
                    student: courseStudentInfo.student,
                    type: "enroll_course",
                    content: "Đăng ký học được cộng điểm"
                })
            } catch (err) {

            }
        }
        activityService.create({
            student: (courseStudentInfo.student as StudentModel)._id,
            type: "relearn_course",
            content: `Học viên ${(courseStudentInfo.student as StudentModel).firstName} ${(courseStudentInfo.student as StudentModel).lastName} đi học lại khoá học ${(courseStudentInfo.course as CourseModel).name}`
        })
        await courseService.update({
            $inc: { currentStudentAmount: 1 }
        }, {
                filter: {
                    _id: (courseStudentInfo.course as CourseModel)._id
                }
            })
        await studentTimeTableService.update({ status: "active" }, {
            filter: {
                student: (courseStudentInfo.student as StudentModel)._id,
                course: (courseStudentInfo.course as CourseModel)._id
            }
        })
        return await this.service.update({
            startTime: params.startTime,
            endTime: endTime,
            $push: {
                history: {
                    type: "relearn",
                    time: new Date(),
                    monthAmount: monthAmount,
                    package: params.package,
                    fee: feeAmount,
                    isPayFee: params.isPayFee
                }
            },
            $inc: { totalFeeAmount: feeAmount },
            status: "active"
        }, {
                filter: {
                    _id: courseStudentInfo._id
                }
            })

    }
    async cancel(params: {
        courseStudentId: string
        reason: string
    }) {
        const courseStudentInfo: CourseStudentModel = await this.service.getItem({
            filter: {
                _id: params.courseStudentId
            },
            populates: [
                {
                    path: "course",
                    select: "name"
                },
                {
                    path: "student",
                    select: "firstName lastName"
                }
            ]
        })
        if (courseStudentInfo.status === "deactive") {
            throw errorService.courseStudent.haveCancel()
        }
        activityService.create({
            student: (courseStudentInfo.student as StudentModel)._id,
            type: "cancel_course",
            content: `Học viên ${(courseStudentInfo.student as StudentModel).firstName} ${(courseStudentInfo.student as StudentModel).lastName} nghỉ khoá học ${(courseStudentInfo.course as CourseModel).name} với lý do ${params.reason}`
        })
        await courseService.update({
            $inc: { currentStudentAmount: -1 }
        }, {
                filter: {
                    _id: (courseStudentInfo.course as CourseModel)._id
                }
            })
        await studentTimeTableService.update({ status: "deactive" }, {
            filter: {
                student: (courseStudentInfo.student as StudentModel)._id,
                course: (courseStudentInfo.course as CourseModel)._id
            }
        })
        return await this.service.update({
            status: "deactive",
            $push: {
                history: {
                    type: "cancel",
                    time: new Date(),
                    reason: params.reason
                }
            }
        },
            {
                filter: {
                    _id: params.courseStudentId
                }
            })
    }
    async extend(params: {
        courseStudentId: string,
        monthAmount: number,
        isPayFee: boolean,
        type: "package" | "monthAmount",
        package: string
    }) {
        const courseStudentInfo: CourseStudentModel = await this.service.getItem({
            filter: {
                _id: params.courseStudentId,
                status: "active"
            },
            populates: ["course"]
        })
        let packageInfo: PackageModel
        let endTime: string
        let monthAmount: number
        let feeAmount: number
        let endTimeOfCourseStudent = courseStudentInfo.endTime
        // let timenow = moment().format()
        if (moment(moment().format()).isAfter(courseStudentInfo.endTime)) {
            endTimeOfCourseStudent = moment().toDate()
        }
        if (params.type === "package") {
            packageInfo = await packageService.getItem({ filter: { _id: params.package } })
            feeAmount = packageInfo.price
            endTime = moment(endTimeOfCourseStudent).add(packageInfo.monthAmount, "months").format()
            monthAmount = packageInfo.monthAmount
        } else {
            endTime = moment(endTimeOfCourseStudent).add(params.monthAmount, "months").format()
            monthAmount = params.monthAmount
            feeAmount = (courseStudentInfo.course as CourseModel).pricePerMonth * params.monthAmount
        }
        if (monthAmount >= 3) {
            try {
                studentService.update({ $inc: { point: 10 } }, { filter: { _id: courseStudentInfo.student } })
                activityService.create({
                    student: courseStudentInfo.student,
                    type: "enroll_course",
                    content: "Đăng ký học được cộng điểm"
                })
            } catch (err) {

            }
        }
        return await this.service.update({
            endTime: endTime,
            $push: {
                history: {
                    type: "extend",
                    time: new Date(),
                    monthAmount: monthAmount,
                    package: params.package,
                    fee: feeAmount,
                    isPayFee: params.isPayFee
                }
            },
            $inc: { totalFeeAmount: feeAmount },
            status: "active"
        }, {
                filter: {
                    _id: courseStudentInfo._id
                }
            })

    }
}