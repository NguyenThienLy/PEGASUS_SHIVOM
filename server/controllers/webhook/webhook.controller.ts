import { BaseController } from '../base.controller'
import { StudentModel, ClassTimeTableModel, StudentTimeTableModel } from '../../models';
import { studentService, timeTableItemService, classTimeTableService, studentTimeTableService, checkinService } from '../../services';

import * as moment from 'moment'

export class WebhookController extends BaseController {
    constructor() {
        super()
    }
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
        const timeAtNumber = checkInAtHours * 60 + checkInAtMinute
        // Tìm kiếm thời khoá biểu
        const { rows: timeTableItems } = await timeTableItemService.getList({
            filter: {
                'startAvailableCheckinTime.number': { $lte: timeAtNumber },
                'endAvailabelCheckinTime.number': { $gte: timeAtNumber }
            }
        })
        // Tìm kiếm lớp học
        for (const timeTableItem of timeTableItems) {
            try {
                const classTimeTable: ClassTimeTableModel = await classTimeTableService.getItem({
                    filter: {
                        items: timeTableItem._id
                    }
                })
                const studentTimeTable: StudentTimeTableModel = await studentTimeTableService.getItem({
                    filter: {
                        items: timeTableItem._id
                    }
                })
                if (classTimeTable.class.toString() === studentTimeTable.class.toString() && classTimeTable.course.toString() === studentTimeTable.course.toString()) {
                    checkinService.create({
                        student: student._id,
                        class: classTimeTable.class,
                        course: classTimeTable.course,
                        checkinAt: moment(Number(timestamps)).format()
                    })
                    break
                }

            } catch (err) {
                console.log("err: ", err)
            }
        }

    }
}