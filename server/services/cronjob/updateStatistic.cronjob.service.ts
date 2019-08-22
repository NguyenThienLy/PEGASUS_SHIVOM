import { classService, studentService, checkinService, courseService, courseStudentService, statisticCourseService } from '../index'
import * as moment from 'moment'
import * as _ from 'lodash'
import { async } from 'q';
import { CONNREFUSED } from 'dns';

export class UpdateStatisticCronJob {
    constructor() {
    }
    static instance: UpdateStatisticCronJob
    static getInstance(): UpdateStatisticCronJob {
        if (!this.instance) {
            this.instance = new UpdateStatisticCronJob()
        }
        return this.instance
    }
    // Hàm ghi nhận dữ liệu để thông kê cho lớp học
    async updateStatistic() {
        // Lấy ra danh sách các checkin của ngày hôm trước
        const startTime = moment().subtract(1, "days").startOf("days").toDate()
        const endTime = moment().subtract(1, "days").endOf("days").toDate()
       
        // Lấy ra tuần hiện tại
        const currWeek = moment(startTime).week()
        // Lấy ra tháng hiện tại
        const currMonth = moment(startTime).month() + 1
        // Lấy ra năm hiện tại
        const currYear = moment(startTime).year()

        console.log(currWeek);
        console.log(currMonth);
        console.log(currYear);

        // Gom nhóm học viên theo khóa học 
        const listCheckin = await checkinService.model.aggregate([
            // Lấy ra danh sách checkin của ngày hôm qua
            { $match: { checkinAt: { $gte: startTime, $lte: endTime } } },
            // Góm nhóm
            {
                $group: {
                    "_id": "$course",
                    "students": { $push: "$$ROOT" }
                }
            }
        ])

        console.log(listCheckin)

        // Góm nhóm học viên theo type [đúng, trễ, thừa, vắng]
        // on_time, late, redundant, absent
        for (const course of listCheckin) {
            // Lấy ra danh sách học viên của khóa học đó
            const listStudentOfCourse = await courseStudentService.model.find({ course: course._id }).select('_id course student')

            // Gom nhóm các học viên của một khóa học theo type
            const listStudentFollowType = _.groupBy(course.students, "type")

            // Danh sách học viên đi đúng giờ
            const listStudentTypeOnTime = listStudentFollowType.on_time
            // Danh sách học viên đi muộn
            const listStudentTypeLate = listStudentFollowType.late
            // Danh sách học viên đi thừa trong ngày
            const listStudentTypeRedundant = listStudentFollowType.redundant
            // Danh sách học viên vắng lấy những học sinh không có trong ds đi học đúng giờ và đi trễ
            const listStudentTypeAbsent = listStudentOfCourse.filter(function (item) {
                return _.findIndex(_.concat(listStudentTypeOnTime, listStudentTypeLate), { 'student': item.student }) === -1;
            });

            // Nếu danh không tồn tại thì sẽ bị lỗi

            //+Tổng số vắng
            //+Tổng số trễ
            //+Tổng số đi đúng
            //+Tổng số đi thừa

            // type week, month, year

            // Cập nhật tuần cho khóa học
            this.updateStatisticCourse({
                course: course._id,
                week: currWeek,
                month: currMonth,
                year: currYear,
                type: "week",
                totalAbsent: listStudentTypeAbsent.length,
                totalLate: listStudentTypeLate.length,
                totalOntime: listStudentTypeOnTime.length,
                totalRedundant: listStudentTypeRedundant.length
            })

            // Cập nhật tháng cho khóa học
            this.updateStatisticCourse({
                course: course._id,
                week: null,
                month: currMonth,
                year: currYear,
                type: "month",
                totalAbsent: listStudentTypeAbsent.length,
                totalLate: listStudentTypeLate.length,
                totalOntime: listStudentTypeOnTime.length,
                totalRedundant: listStudentTypeRedundant.length
            })

            // Cập nhật năm cho khóa học
            this.updateStatisticCourse({
                course: course._id,
                week: null,
                month: null,
                year: currYear,
                type: "year",
                totalAbsent: listStudentTypeAbsent.length,
                totalLate: listStudentTypeLate.length,
                totalOntime: listStudentTypeOnTime.length,
                totalRedundant: listStudentTypeRedundant.length
            })
        }
    }

    updateStatisticCourse(params: {
        course: string,
        week: number,
        month: number,
        year: number,
        type: string,
        totalAbsent: number,
        totalLate: number,
        totalOntime: number,
        totalRedundant: number
    }) {
        statisticCourseService.model.
            findOneAndUpdate({ course: params.course, "time.week": params.week, "time.month": params.month, "time.year": params.year, type: params.type },
                {
                    course: params.course, "time.week": params.week, "time.month": params.month, "time.year": params.year, type: params.type,
                    $inc: {
                        totalAbsent: params.totalAbsent, totalLate: params.totalLate,
                        totalOntime: params.totalOntime, totalRedundant: params.totalRedundant
                    }
                },
                {
                    upsert: true,
                    new: true
                })
    }
}
