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
        const checkInTime = moment.unix(Number(timestamps)).utcOffset("+07:00").format()
        const timestampAtNumber = checkInAtHours * 60 + checkInAtMinute
        // Tìm kiếm thời khoá biểu
        const dayOfWeek = this.helper.getDayOfWeek(moment.unix(Number(timestamps)).utcOffset("+07:00").format())
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
                        startTime: 1,
                        status: 1
                    }
                }, {
                    $match: {
                        'startAvailableCheckinTimeNumber': { $lte: timestampAtNumber },
                        'endTimeNumber': { $gte: timestampAtNumber },
                        dayOfWeek,
                        status: "active"
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
                        items: timeTableItem._id,
                        status: "active"
                    }
                })
                const courseStudent: CourseStudentModel = await courseStudentService.getItem({
                    filter: {
                        student: student._id,
                        course: classTimeTable.course,
                        status: "active"
                    }
                })
                const startAvailableCheckinTime = moment(checkInTime).hour(Math.floor(timeTableItem.startAvailableCheckinTimeNumber / 60)).minute(timeTableItem.startAvailableCheckinTimeNumber % 60).utcOffset("+07:00").format()
                const endTime = moment(checkInTime).hour(Math.floor(timeTableItem.endTimeNumber / 60)).minute(timeTableItem.endTimeNumber % 60).utcOffset("+07:00").format()

                const checkInType = await this.helper.getCheckinType({
                    timestampAtNumber: timestampAtNumber,
                    student,
                    courseId: classTimeTable.course as string,
                    timeTableItem: timeTableItem,
                    checkInTime
                })
                const checkinData = await checkinService.getItem({
                    filter: {
                        student: student._id,
                        class: classTimeTable.class,
                        course: classTimeTable.course,
                        timeTableItem: timeTableItem._id,
                        checkinAt: {
                            $gte: startAvailableCheckinTime, $lte: endTime
                        }
                    }
                }).then(result => {
                    return result
                }).catch(async err => {

                    try {
                        courseStudent.update({
                            $inc: {
                                totalLessonUsed: 1
                            }
                        }).exec()
                    } catch (err) {

                    }
                    return await checkinService.create({
                        student: student._id,
                        class: classTimeTable.class,
                        course: classTimeTable.course,
                        checkinAt: moment.unix(Number(timestamps)).utcOffset("+07:00"),
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