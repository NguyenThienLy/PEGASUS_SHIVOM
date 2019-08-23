import { checkinService, statisticStudentService } from '../index'
import * as moment from 'moment'
import * as _ from 'lodash'

export class UpdateStatisticStudentCronJob {
    constructor() {
    }

    static instance: UpdateStatisticStudentCronJob
    static getInstance(): UpdateStatisticStudentCronJob {
        if (!this.instance) {
            this.instance = new UpdateStatisticStudentCronJob()
        }
        return this.instance
    }

    // Hàm ghi nhận dữ liệu để thông kê cho khóa học
    async updateStatisticStudent() {
        // Lấy ra danh sách các checkin của ngày hôm trước
        const startTime = moment().subtract(1, "days").startOf("days").toDate()
        const endTime = moment().subtract(1, "days").endOf("days").toDate()

        // Lấy ra tuần hiện tại
        const currWeek = moment(startTime).week()
        // Lấy ra tháng hiện tại
        const currMonth = moment(startTime).month() + 1
        // Lấy ra năm hiện tại
        const currYear = moment(startTime).year()

        // Gom nhóm học viên theo khóa học 
        const listCheckin = await checkinService.model.aggregate([
            // Lấy ra danh sách checkin của ngày hôm qua
            { $match: { checkinAt: { $gte: startTime, $lte: endTime } } },
            // Góm nhóm theo học sinh
            {
                $group: {
                    "_id": "$student",
                    "checkins": { $push: "$$ROOT" }
                }
            }
        ])

        // Góm nhóm học viên theo type [đúng, trễ, thừa, vắng]
        // on_time, late, redundant, absent
        for (const student of listCheckin) {
            // Gom nhóm các học viên theo type
            const listStudentFollowType = _.groupBy(student.checkins, "type")

            //+Danh sách ngày vắng
            //+Danh sách ngày trễ
            //+Danh sách ngày đúng
            //+Danh sách ngày thừa

            // type week, month, year
            // Cập nhật danh sách học sinh vắng
            this.updateDataStatisticStudent({
                student: student._id,
                week: currWeek,
                month: currMonth,
                year: currYear,
                // Lấy danh sách các ngày học viên vắng
                objAbsent: _.map(listStudentFollowType.absent, function (item) {
                    return { course: item.course, time: item.checkinAt }
                }),
                // Lấy danh sách các ngày học viên đi trễ
                objLate: _.map(listStudentFollowType.late, function (item) {
                    return { course: item.course, time: item.checkinAt }
                }),
                // Lấy danh sách các ngày học viên đi đúng giờ
                objOnTime: _.map(listStudentFollowType.on_time, function (item) {
                    return { course: item.course, time: item.checkinAt }
                }),
                // Lấy danh sách các ngày học viên đi thừa
                objRedundant: _.map(listStudentFollowType.redundant, function (item) {
                    return { course: item.course, time: item.checkinAt }
                })
            })
        }
    }

    // Cập nhật dữ liệu biểu đồ cho khóa học
    updateDataStatisticStudent(params: {
        student: string,
        week: number,
        month: number,
        year: number,
        objAbsent: any,
        objLate: any,
        objOnTime: any,
        objRedundant: any
    }) {

        // Cập nhật theo tuần cho học sinh
        statisticStudentService.model.
            findOneAndUpdate({ student: params.student, "time.week": params.week, "time.month": params.month, "time.year": params.year, type: "week", status: "active" },
                {
                    student: params.student, "time.week": params.week, "time.month": params.month, "time.year": params.year, type: "week", status: "active",
                    $push: {
                        absent: params.objAbsent, late: params.objLate,
                        onTime: params.objOnTime, redundant: params.objRedundant
                    }
                },
                {
                    upsert: true,
                    new: true
                }).exec()

        // Cập nhật theo tháng cho học sinh
        statisticStudentService.model.
            findOneAndUpdate({ student: params.student, "time.week": null, "time.month": params.month, "time.year": params.year, type: "month", status: "active" },
                {
                    student: params.student, "time.week": null, "time.month": params.month, "time.year": params.year, type: "month", status: "active",
                    $push: {
                        absent: params.objAbsent, late: params.objLate,
                        onTime: params.objOnTime, redundant: params.objRedundant
                    }
                },
                {
                    upsert: true,
                    new: true
                }).exec()

        // Cập nhật theo năm cho học sinh
        statisticStudentService.model.
            findOneAndUpdate({ student: params.student, "time.week": null, "time.month": null, "time.year": params.year, type: "year", status: "active" },
                {
                    student: params.student, "time.week": null, "time.month": null, "time.year": params.year, type: "year", status: "active",
                    $push: {
                        absent: params.objAbsent, late: params.objLate,
                        onTime: params.objOnTime, redundant: params.objRedundant
                    }
                },
                {
                    upsert: true,
                    new: true
                }).exec()
    }
}