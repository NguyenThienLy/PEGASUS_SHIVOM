import { CrudController } from '../crud.controller'
import { statisticCourseService, checkinService, cacheService, utilService, statisticStudentService, studentService } from '../../services/index'
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
        //console.log("paramsControll", params)

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

    async test(params: {
        startTime: Date
        endTime: Date
    }) {
        // Lay ma hash duy nhat de query cache
        const hashCode = hash(JSON.stringify(params))
        // Lay du lieu trong cache
        const cacheData = await cacheService.get(hashCode)

        if (cacheData) {
            return cacheData
        } else {
            const { startTime, endTime } = params

            // console.log("startTime", "endTime", startTime, endTime)

            // Gom nhóm học viên theo khóa học 
            const listCheckin = await statisticStudentService.model.aggregate([
                {
                    $group:
                    {
                        "_id": "$student",
                        "checkins": { $push: "$$ROOT" }
                    },

                },
                {
                    $lookup: {
                        from: "students",
                        localField: "_id",
                        foreignField: "_id",
                        as: "students_docs"
                    }
                },
                {
                    $project:
                    {
                        "_id": 1,
                        "students_docs._id": 1,
                        "checkins": 1
                    },
                }
            ])

            // const student = await studentService.model.aggregate([
            //     {
            //         $project:
            //         {
            //             "_id": 1
            //         },
            //         // $lookup: {
            //         //     from: "students",
            //         //     localField: "_id",
            //         //     foreignField: "_id",
            //         //     as: "students_docs"
            //         // }
            //     }
            // ])

            var i = 0
            listCheckin.forEach(e => {
                if (e.students_docs[0] != undefined)
                    console.log(i++, e._id, e.checkins.length, e.students_docs[0]._id)
                else
                    console.log(i++, e._id, e.checkins.length)
            })

            // Thống kê theo kiểu week, month, year
            return listCheckin
        }
    }
}