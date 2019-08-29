import { BaseController } from '../base.controller'
import { StudentModel, ClassTimeTableModel, StudentTimeTableModel, CourseStudentModel } from '../../models';
import { studentService, timeTableItemService, classTimeTableService, studentTimeTableService, checkinService, courseStudentService, errorService } from '../../services';

import * as moment from 'moment'
import { WebhookControllerHelper } from './webhook.helper';

export class WebhookController extends BaseController {
    constructor() {
        super()
        this.helper = new WebhookControllerHelper()
    }
    helper: WebhookControllerHelper
    async onCheckInEvent(params: {
        cardId: string,
        timestamps: number
    }) {
        const { cardId, timestamps } = params
        const student: StudentModel = await studentService.getItem({
            filter: {
                cardId: cardId
            }
        })
        this.checkStudentTimeTable({
            student,
            timestamps
        })
        return student
    }
    async checkStudentTimeTable(params: {
        student: StudentModel,
        timestamps: number,
        isFromAdmin?: boolean
    }) {
        const { student, timestamps, isFromAdmin = false } = params
        const checkInAtHours = moment.unix(Number(timestamps)).utcOffset("+07:00").hours()
        const checkInAtMinute = moment.unix(Number(timestamps)).utcOffset("+07:00").minute()
        const timestampAtNumber = checkInAtHours * 60 + checkInAtMinute
        // Tìm kiếm thời khoá biểu
        const dayOfWeek = this.helper.getDayOfWeek(moment(Number(timestamps)).format())
        // let { rows: timeTableItems } = await timeTableItemService.getList({
        //     filter: {
        //         'startAvailableCheckinTime.number': { $lte: timestampAtNumber },
        //         'endTime.number': { $gte: timestampAtNumber },
        //         dayOfWeek
        //     }
        // })
        let timeTableItems = await timeTableItemService.model.aggregate(
            [
                {
                    $project: {
                        endTimeNumber: "$endTime.number",
                        startAvailableCheckinTimeNumber: "$startAvailableCheckinTime.number",
                        dayOfWeek: 1,
                        startTime: 1
                    }
                }, {
                    $match: {
                        'startAvailableCheckinTimeNumber': { $lte: timestampAtNumber },
                        'endTimeNumber': { $gte: timestampAtNumber },
                        dayOfWeek
                    }
                }, {
                    $sort: {
                        endTimeNumber: 1
                    }
                }
            ]
        )
        timeTableItems = this.helper.sortByCheckinTime(timestampAtNumber, timeTableItems)
        // Kiem tra khoa hoc, hoc sinh co trong khoa hoc khong, da checkin chua 
        if (timeTableItems.length === 0) {
            if (isFromAdmin) {
                throw errorService.student.courseHaventApplied()
            } else {
                return
            }
        }
        for (const timeTableItem of timeTableItems) {
            try {
                const classTimeTable: ClassTimeTableModel = await classTimeTableService.getItem({
                    filter: {
                        items: timeTableItem._id
                    }
                })
                const courseStudent: CourseStudentModel = await courseStudentService.getItem({
                    filter: {
                        student: student._id,
                        course: classTimeTable.course
                    }
                })
                const checkInType = await this.helper.getCheckinType({
                    timestampAtNumber: timestampAtNumber,
                    student,
                    courseId: classTimeTable.course as string,
                    timeTableItem: timeTableItem
                })

                // Neu da checkin vao lich nay roi thi khong tao nua
                const checkinData = await checkinService.getItem({
                    filter: {
                        student: student._id,
                        class: classTimeTable.class,
                        course: classTimeTable.course,
                        timeTableItem: timeTableItem._id
                    }
                }).then(result => {
                    return result
                }).catch(async err => {
                    return await checkinService.create({
                        student: student._id,
                        class: classTimeTable.class,
                        course: classTimeTable.course,
                        checkinAt: moment(Number(timestamps)).format(),
                        timeTableItem: timeTableItem._id,
                        type: checkInType
                    })
                })
                return checkinData


            } catch (err) {
            }
        }

    }
}