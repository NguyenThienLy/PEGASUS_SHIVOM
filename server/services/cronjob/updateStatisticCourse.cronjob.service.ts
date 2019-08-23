import { checkinService, courseStudentService, statisticCourseService } from '../index'
import * as moment from 'moment'
import * as _ from 'lodash'

export class UpdateStatisticCourseCronJob {
    constructor() {
    }
    static instance: UpdateStatisticCourseCronJob
    static getInstance(): UpdateStatisticCourseCronJob {
        if (!this.instance) {
            this.instance = new UpdateStatisticCourseCronJob()
        }
        return this.instance
    }
    // Hàm ghi nhận dữ liệu để thông kê cho khóa học
    async updateStatisticCourse() {
        // Lấy ra danh sách các checkin của ngày hôm trước
        const startTime = moment().utcOffset("+07:00").subtract(1, "days").startOf("days").toDate()
        const endTime = moment().utcOffset("+07:00").subtract(1, "days").endOf("days").toDate()

        //console.log(endTime)

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
            // Góm nhóm theo khóa học
            {
                $group: {
                    "_id": "$course",
                    "checkins": { $push: "$$ROOT" }
                }
            }
        ])

        //console.log(listCheckin)

        // Góm nhóm học viên theo type [đúng, trễ, thừa, vắng]
        // on_time, late, redundant, absent
        for (const course of listCheckin) {
            // Lấy ra danh sách học viên của khóa học đó
            const listStudentOfCourse = await courseStudentService.model.find({ course: course._id }).select('_id course student')

            // Gom nhóm các học viên của một khóa học theo type
            const listStudentFollowType = _.groupBy(course.checkins, "type")

            // Danh sách học viên đi đúng giờ
            const listStudentTypeOnTime = listStudentFollowType.on_time || []
            //console.log(listStudentTypeOnTime)
            // Danh sách học viên đi muộn
            const listStudentTypeLate = listStudentFollowType.late || []
            //console.log(listStudentTypeLate)
            // Danh sách học viên đi thừa trong ngày
            const listStudentTypeRedundant = listStudentFollowType.redundant || []
            //console.log(listStudentTypeRedundant)
            // Danh sách học viên vắng lấy những học sinh không có trong ds đi học đúng giờ và đi trễ
            const listStudentTypeAbsent = listStudentOfCourse.filter(function (item) {
                return _.findIndex(_.concat(listStudentTypeOnTime, listStudentTypeLate), { 'student': item.student }) === -1;
            });
            //console.log(listStudentTypeAbsent)

            // Nếu danh không tồn tại thì sẽ bị lỗi

            //+Tổng số vắng
            //+Tổng số trễ
            //+Tổng số đi đúng
            //+Tổng số đi thừa

            // type week, month, year

            // Cập nhật tuần || tháng || năm cho khóa học
            this.updateDataStatisticCourse({
                course: course._id,
                week: currWeek,
                month: currMonth,
                year: currYear,
                totalAbsent: listStudentTypeAbsent.length,
                totalLate: listStudentTypeLate.length,
                totalOnTime: listStudentTypeOnTime.length,
                totalRedundant: listStudentTypeRedundant.length
            })

            // Thêm loại học sinh vắng vào bảng checkin
            this.addStudentTypeAbsentInCheckin({
                course: course._id,
                listStudentTypeAbsent: listStudentTypeAbsent,
                endTime: endTime
            })
        }
    }

    // Cập nhật dữ liệu biểu đồ cho khóa học
    updateDataStatisticCourse(params: {
        course: string,
        week: number,
        month: number,
        year: number,
        totalAbsent: number,
        totalLate: number,
        totalOnTime: number,
        totalRedundant: number
    }) {
        // Cập nhật tuần cho khóa học
        statisticCourseService.model.
            findOneAndUpdate({ course: params.course, "time.week": params.week, "time.month": params.month, "time.year": params.year, type: "week" },
                {
                    course: params.course, "time.week": params.week, "time.month": params.month, "time.year": params.year, type: "week",
                    $inc: {
                        totalAbsent: params.totalAbsent, totalLate: params.totalLate,
                        totalOnTime: params.totalOnTime, totalRedundant: params.totalRedundant
                    }
                },
                {
                    upsert: true,
                    new: true
                }).exec()

        // Cập nhật tháng cho khóa học
        statisticCourseService.model.
            findOneAndUpdate({ course: params.course, "time.week": null, "time.month": params.month, "time.year": params.year, type: "month" },
                {
                    course: params.course, "time.week": null, "time.month": params.month, "time.year": params.year, type: "month",
                    $inc: {
                        totalAbsent: params.totalAbsent, totalLate: params.totalLate,
                        totalOnTime: params.totalOnTime, totalRedundant: params.totalRedundant
                    }
                },
                {
                    upsert: true,
                    new: true
                }).exec()

        // Cập nhật năm cho khóa học
        statisticCourseService.model.
            findOneAndUpdate({ course: params.course, "time.week": null, "time.month": null, "time.year": params.year, type: "year" },
                {
                    course: params.course, "time.week": null, "time.month": null, "time.year": params.year, type: "year",
                    $inc: {
                        totalAbsent: params.totalAbsent, totalLate: params.totalLate,
                        totalOnTime: params.totalOnTime, totalRedundant: params.totalRedundant
                    }
                },
                {
                    upsert: true,
                    new: true
                }).exec()
    }

    // Cập nhật loại học sinh vắng vào bảng checkin
    async addStudentTypeAbsentInCheckin(params: {
        course: string,
        listStudentTypeAbsent: any,
        endTime: Date
    }) {
        const checkinAbsents = _.map(params.listStudentTypeAbsent, function (item) {
            return { student: item.student, course: item.course, checkinAt: params.endTime, type: "absent" }
        })

        checkinService.model.insertMany(checkinAbsents)
    }
}
