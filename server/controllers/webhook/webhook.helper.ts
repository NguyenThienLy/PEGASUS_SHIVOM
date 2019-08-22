import { TimeTableItemModel, StudentModel, CourseModel } from "../../models";
import { checkinService } from "../../services";

import * as moment from 'moment'

export class WebhookControllerHelper {
    constructor() {

    }
    getDayOfWeek(timestamps: string) {
        const day = moment(timestamps).day()
        switch (day) {
            case 1: return "monday"
            case 2: return "tuesday"
            case 3: return "webnesday"
            case 4: return "thursday"
            case 5: return "friday"
            case 6: return "saturday"
            case 7: return "sunday"
        }
    }
    async getCheckinType(params: {
        timestampAtNumber: number
        timeTableItem: TimeTableItemModel
        student: StudentModel
        courseId: string
    }) {
        const { timestampAtNumber, timeTableItem, student, courseId } = params
        const startDay = moment().utcOffset("+07:00").startOf("days").format()
        const minuteDiff = timestampAtNumber - timeTableItem.startTime.number
        let checkInType: string
        const { rows: lastCheckinInDay } = await checkinService.getList({
            filter: {
                student: student._id,
                course: courseId,
                checkinAt: { $gte: startDay }
            }
        })
        if (lastCheckinInDay.length > 0) {
            return "redundant"
        } else if (minuteDiff <= 5) {
            return "on_time"
        } else {
            return "late"
        }
    }
}