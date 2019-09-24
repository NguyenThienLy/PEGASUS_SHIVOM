import { TimeTableItemModel, StudentModel, CourseModel } from "../../models";
import { checkinService } from "../../services";

import * as moment from 'moment'

export class WebhookControllerHelper {
    constructor() {

    }
    sortByCheckinTime(checkInAtNumber, timeTableItems) {
        let subtractArray = []
        let desArray = []
        for (const index in timeTableItems) {
            subtractArray.push({
                index: Number(index),
                value: timeTableItems[Number(index)].endTimeNumber - checkInAtNumber
            })
        }
        subtractArray = subtractArray.sort(function (a, b) {
            if (a.value > b.value) {
                return -1
            }
            if (a.value < b.value) {
                return 1
            }
            return 0
        })
        desArray = subtractArray.map((item) => {
            return timeTableItems[item.index]
        })
        return desArray
    }
    getDayOfWeek(timestamps: string) {
        const day = moment(timestamps).day()
        switch (day) {
            case 1: return "monday"
            case 2: return "tuesday"
            case 3: return "wednesday"
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
        console.log(timeTableItem)
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