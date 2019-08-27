import { CrudController } from '../crud.controller'
import { statisticCourseService, checkinService } from '../../services/index'
import * as moment from 'moment'

export class StatisticCourseController extends CrudController<typeof statisticCourseService>{
    constructor() {
        super(statisticCourseService);
    }

    async statisticLine(params: {
        course: string,
        type: "week" | "month" | "year" | "realTime",
        startTime: Date,
        endTime: Date
    }) {
        const { course, type, startTime, endTime } = params
        let totalWeekStartTime, totalWeekEndTime

        // Đổi sang tuần theo type
        switch (type) {
            case "week":
                totalWeekStartTime = moment(startTime).week() + moment(startTime).year() * 52
                totalWeekEndTime = moment(endTime).week() + moment(endTime).year() * 52
                break

            case "month":
                totalWeekStartTime = (moment(startTime).month() - 1) * 4 + moment(startTime).year() * 52
                totalWeekEndTime = (moment(endTime).month() - 1) * 4 + moment(endTime).year() * 52
                break

            case "year":
                totalWeekStartTime = moment(startTime).year() * 52
                totalWeekEndTime = moment(endTime).year() * 52
                break
        }

        // Thống kê theo kiểu realTime
        if (type === "realTime")
            return checkinService.getDateInStatisticLine({
                course
            })

        // Thống kê theo kiểu week, month, year
        return this.service.getDateInStatisticLine({
            course,
            type,
            totalWeekStartTime,
            totalWeekEndTime
        })
    }

    async statisticPie(params: {
        course: string,
        type: "week" | "month" | "year" | "realTime",
        startTime: Date,
        endTime: Date
    }) {
        const { course, type, startTime, endTime } = params
        let totalWeekStartTime, totalWeekEndTime

        // Đổi sang tuần theo type
        switch (type) {
            case "week":
                totalWeekStartTime = moment(startTime).week() + moment(startTime).year() * 52
                totalWeekEndTime = moment(endTime).week() + moment(endTime).year() * 52
                break

            case "month":
                totalWeekStartTime = (moment(startTime).month() - 1) * 4 + moment(startTime).year() * 52
                totalWeekEndTime = (moment(endTime).month() - 1) * 4 + moment(endTime).year() * 52
                break

            case "year":
                totalWeekStartTime = moment(startTime).year() * 52
                totalWeekEndTime = moment(endTime).year() * 52
                break
        }

        // Thống kê theo kiểu realTime
        if (type === "realTime")
            return checkinService.getDateInStatisticPie({
                course
            })

        // Thống kê theo kiểu week, month, year
        return this.service.getDateInStatisticPie({
            course,
            type,
            totalWeekStartTime,
            totalWeekEndTime
        })
    }

}