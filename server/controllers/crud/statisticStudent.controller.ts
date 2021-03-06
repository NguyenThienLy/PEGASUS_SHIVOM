import { CrudController } from '../crud.controller'
import { statisticStudentService, checkinService, cacheService, utilService } from '../../services/index'
import * as moment from 'moment'
import * as hash from 'object-hash'
import { format } from 'util';

export class StatisticStudentController extends CrudController<typeof statisticStudentService>{
    constructor() {
        super(statisticStudentService);
    }

    async statisticForListDetail(params: {
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
                    const tempStartDate = utilService.parseDateToWeekMonthYear(startTime)
                    const tempEndDate = utilService.parseDateToWeekMonthYear(endTime)

                    totalWeekStartTime = tempStartDate.week + tempStartDate.year * 52
                    totalWeekEndTime = tempEndDate.week + tempEndDate.year * 52
                    break

                case "month":
                    totalWeekStartTime = moment(startTime).month() * 4 + moment(startTime).year() * 52
                    totalWeekEndTime = moment(endTime).month() * 4 + moment(endTime).year() * 52
                    break

                case "year":
                    totalWeekStartTime = moment(startTime).year() * 52
                    totalWeekEndTime = moment(endTime).year() * 52
                    break
            }

            // Thống kê theo kiểu realTime
            if (type === "realTime")
                return checkinService.getDataInStatisticForListDetail({
                    course
                })

            // Thống kê theo kiểu week, month, year
            return this.service.getDateInStatisticForListDetail({
                course,
                type,
                totalWeekStartTime,
                totalWeekEndTime
            })
        }
    }

    async statisticForCalendarChart(params: {
        student: string,
        course: string,
        type: "week" | "month" | "year",
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
            const { student, course, type, startTime, endTime } = params
            let totalWeekStartTime, totalWeekEndTime

            // Đổi sang tuần theo type
            switch (type) {
                case "week":
                    const tempStartDate = utilService.parseDateToWeekMonthYear(startTime)
                    const tempEndDate = utilService.parseDateToWeekMonthYear(endTime)

                    totalWeekStartTime = tempStartDate.week + tempStartDate.year * 52
                    totalWeekEndTime = tempEndDate.week + tempEndDate.year * 52
                    break

                case "month":
                    totalWeekStartTime = moment(startTime).month() * 4 + moment(startTime).year() * 52
                    totalWeekEndTime = moment(endTime).month() * 4 + moment(endTime).year() * 52
                    break

                case "year":
                    totalWeekStartTime = moment(startTime).year() * 52
                    totalWeekEndTime = moment(endTime).year() * 52
                    break
            }

            // Thống kê theo kiểu week, month, year
            return this.service.getDateInStatisticForCalendarChart({
                student,
                course,
                type,
                totalWeekStartTime,
                totalWeekEndTime
            })
        }
    }

    async statisticForPieChart(params: {
        student: string,
        course: string,
        type: "week" | "month" | "year",
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
            const { student, course, type, startTime, endTime } = params
            let totalWeekStartTime, totalWeekEndTime

            // Đổi sang tuần theo type
            switch (type) {
                case "week":
                    const tempStartDate = utilService.parseDateToWeekMonthYear(startTime)
                    const tempEndDate = utilService.parseDateToWeekMonthYear(endTime)

                    totalWeekStartTime = tempStartDate.week + tempStartDate.year * 52
                    totalWeekEndTime = tempEndDate.week + tempEndDate.year * 52
                    break

                case "month":
                    totalWeekStartTime = moment(startTime).month() * 4 + moment(startTime).year() * 52
                    totalWeekEndTime = moment(endTime).month() * 4 + moment(endTime).year() * 52
                    break

                case "year":
                    totalWeekStartTime = moment(startTime).year() * 52
                    totalWeekEndTime = moment(endTime).year() * 52
                    break
            }

            // Thống kê theo kiểu week, month, year
            return this.service.getDateInStatisticForPieChart({
                student,
                course,
                type,
                totalWeekStartTime,
                totalWeekEndTime
            })
        }
    }
}