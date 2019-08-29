import { CrudController } from '../crud.controller'
import { statisticCourseService, checkinService, cacheService } from '../../services/index'
import * as moment from 'moment'
import * as hash from 'object-hash'

export class StatisticCourseController extends CrudController<typeof statisticCourseService>{
    constructor() {
        super(statisticCourseService);
    }

    async statisticForLineChart(params: {
        course: string,
        type: "week" | "month" | "year" | "realTime",
        startTime: Date,
        endTime: Date
    }) {

        // Lay ma hash duy nhat de query cache
        const hashCode = hash(JSON.stringify(params))
        // Lay du lieu trong cache
        const cacheData = await cacheService.get(hashCode)

        if (cacheData) {
            return cacheData
        } else {
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
                return checkinService.getDataInStatisticForLineChart({
                    course
                })

            // Thống kê theo kiểu week, month, year
            return this.service.getDataInStatisticForLineChart({
                course,
                type,
                totalWeekStartTime,
                totalWeekEndTime
            })
        }
    }

    async statisticForPieChart(params: {
        course: string,
        type: "week" | "month" | "year" | "realTime",
        startTime: Date,
        endTime: Date
    }) {
        // Lay ma hash duy nhat de query cache
        const hashCode = hash(JSON.stringify(params))
        // Lay du lieu trong cache
        const cacheData = await cacheService.get(hashCode)

        if (cacheData) {
            return cacheData
        } else {
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
                return checkinService.getDataInStatisticForPieChart({
                    course
                })

            // Thống kê theo kiểu week, month, year
            return this.service.getDataInStatisticForPieChart({
                course,
                type,
                totalWeekStartTime,
                totalWeekEndTime
            })
        }
    }
}