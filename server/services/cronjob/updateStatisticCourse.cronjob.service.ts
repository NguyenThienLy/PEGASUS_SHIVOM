import { checkinService, courseStudentService, statisticCourseService, utilService } from '../index'
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
        const startTime = moment().subtract(1, "days").startOf("days").toDate()
        const endTime = moment().subtract(1, "days").endOf("days").toDate()

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
                startTime: startTime,
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
        startTime: Date,
        totalAbsent: number,
        totalLate: number,
        totalOnTime: number,
        totalRedundant: number
    }) {
        // Đổi lại cho week thôi
        const tempStartDate = utilService.parseDateToWeekMonthYear(params.startTime)

        const month = moment(params.startTime).month() + 1
        const year = moment(params.startTime).year()

        // Cập nhật tuần cho khóa học
        statisticCourseService.model.
            findOneAndUpdate({ course: params.course, "time.week": tempStartDate.week, "time.month": tempStartDate.month, "time.year": tempStartDate.year, type: "week", status: "active" },
                {
                    course: params.course, "time.week": tempStartDate.week, "time.month": tempStartDate.month, "time.year": tempStartDate.year, type: "week", status: "active",
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
            findOneAndUpdate({ course: params.course, "time.week": null, "time.month": month, "time.year": year, type: "month", status: "active" },
                {
                    course: params.course, "time.week": null, "time.month": month, "time.year": year, type: "month", status: "active",
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
            findOneAndUpdate({ course: params.course, "time.week": null, "time.month": null, "time.year": year, type: "year", status: "active" },
                {
                    course: params.course, "time.week": null, "time.month": null, "time.year": year, type: "year", status: "active",
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
    addStudentTypeAbsentInCheckin(params: {
        course: string,
        listStudentTypeAbsent: any,
        endTime: Date
    }) {
        for (const studentTypeAbsent of params.listStudentTypeAbsent) {
            checkinService.model.
                findOneAndUpdate({ student: studentTypeAbsent.student, course: studentTypeAbsent.course, checkinAt: params.endTime, type: "absent", status: "active" },
                    {
                        student: studentTypeAbsent.student,
                        class: null,
                        course: studentTypeAbsent.course,
                        checkinAt: params.endTime,
                        type: "absent",
                        status: "active",
                        timeTableItem: null
                    },
                    {
                        upsert: true,
                        new: true
                    }).exec()
            // Cap nhat so ngay vang cua hoc sinh trong  course student
            courseStudentService.model.update({ student: studentTypeAbsent.course, course: studentTypeAbsent.course }, {
                $inc: { totalAbsent: 1 }
            }).exec()
        }
    }
}
