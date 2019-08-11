import { BaseController } from '../baseController'
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
        console.log("timetamps: ", timestamps)
        const checkInAtHours = moment(Number(timestamps)).hours()
        const checkInAtMinute = moment(Number(timestamps)).minute()
        const timeAtNumber = checkInAtHours * 60 + checkInAtMinute
        console.log("time number: ", timeAtNumber)
        const student: StudentModel = await studentService.getItem({
            filter: {
                cardId: cardId
            }
        })
        console.log('student: ', student)

        // Tìm kiếm thời khoá biểu
        const { rows: timeTableItems } = await timeTableItemService.getList({
            filter: {
                $or: [
                    {

                        "startAvailableCheckinTime.hour": checkInAtHours,
                        "startAvailableCheckinTime.minute": { $lte: checkInAtMinute },
                        "endAvailabelCheckinTime.hour": { $gte: checkInAtHours }

                    },
                    {

                        "startAvailableCheckinTime.hour": { $lt: checkInAtHours },
                        "endAvailabelCheckinTime.minute": { $gte: checkInAtMinute },
                        "endAvailabelCheckinTime.hour": checkInAtHours

                    },
                    {

                        "startAvailableCheckinTime.hour": checkInAtHours,
                        "startAvailableCheckinTime.minute": { $lte: checkInAtMinute },
                        "endAvailabelCheckinTime.minute": { $gte: checkInAtMinute },
                        "endAvailabelCheckinTime.hour": checkInAtHours

                    }
                ]
            }
        })
        console.log("ket thuc")
        console.log("Time table: ", timeTableItems)

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