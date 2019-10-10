import { CrudController } from '../crud.controller'
import { courseStudentService, courseService, packageService, studentService, activityService } from '../../services/index'
import { CourseStudentModel, CourseModel, PackageModel } from '../../models';

import * as moment from 'moment'

export class CourseStudentController extends CrudController<typeof courseStudentService>{
    constructor() {
        super(courseStudentService);
    }
    async extend(params: {
        courseStudentId: string,
        monthAmount: number,
        isPayFee: boolean,
        type: "package" | "normal",
        package: string
    }) {
        const courseStudentInfo: CourseStudentModel = await this.service.getItem({
            filter: {
                _id: params.courseStudentId
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
            $inc: { totalFeeAmount: feeAmount }
        }, {
                filter: {
                    _id: courseStudentInfo._id
                }
            })

    }
}