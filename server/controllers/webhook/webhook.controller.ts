import { BaseController } from '../base.controller'
import { StudentModel, ClassTimeTableModel, StudentTimeTableModel, CourseStudentModel } from '../../models';
import { studentService, timeTableItemService, classTimeTableService, studentTimeTableService, checkinService, courseStudentService } from '../../services';

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
        timestamps: string
    }) {
        const { cardId, timestamps } = params
        const student: StudentModel = await studentService.getItem({
            filter: {
                cardId: cardId
            }
        })
        this.checkStudentTimeTable({
            student,
            cardId,
            timestamps
        })
        return student
    }
    async checkStudentTimeTable(params: {
        student: StudentModel,
        cardId: string,
        timestamps: string
    }) {
        const { student, cardId, timestamps } = params
        const checkInAtHours = moment(Number(timestamps)).hours()
        const checkInAtMinute = moment(Number(timestamps)).minute()
        const timestampAtNumber = checkInAtHours * 60 + checkInAtMinute
        // Tìm kiếm thời khoá biểu
        const dayOfWeek = this.helper.getDayOfWeek(moment(Number(timestamps)).format())
        const { rows: timeTableItems } = await timeTableItemService.getList({
            filter: {
                'startAvailableCheckinTime.number': { $lte: timestampAtNumber },
                'endTime.number': { $gte: timestampAtNumber },
                dayOfWeek
            }
        })
        // Kiem tra khoa hoc, hoc sinh co trong khoa hoc khong, da checkin chua 
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
                    timeTableItem
                })
                // Neu da checkin vao lich nay roi thi khong tao nua
                checkinService.getItem({
                    filter: {
                        student: student._id,
                        class: classTimeTable.class,
                        course: classTimeTable.course,
                        timeTableItem: timeTableItem._id
                    }
                }).catch(err => {
                    checkinService.create({
                        student: student._id,
                        class: classTimeTable.class,
                        course: classTimeTable.course,
                        checkinAt: moment(Number(timestamps)).format(),
                        timeTableItem: timeTableItem._id,
                        type: checkInType
                    })
                })



            } catch (err) {
            }
        }

    }
}