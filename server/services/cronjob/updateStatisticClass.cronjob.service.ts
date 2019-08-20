import { classService, studentService, checkinService, courseService } from '../index'
import * as moment from 'moment'

export class UpdateStatisticClassCronJob {
    constructor() {
    }
    static instance: UpdateStatisticClassCronJob
    static getInstance(): UpdateStatisticClassCronJob {
        if (!this.instance) {
            this.instance = new UpdateStatisticClassCronJob()
        }
        return this.instance
    }
    // Hàm ghi nhận dữ liệu để thông kê cho lớp học
    async updateStatisticClass() {
        // Lấy ra danh sách các checkin của ngày hôm trước
        const startTime = moment().subtract(1, "days").startOf("days").format()
        const endTime = moment().subtract(1, "days").endOf("days").format()

        // Gom nhóm học viên theo khóa học 
        const listCheckin = await checkinService.model.aggregate([
            {
                $group: {
                    "_id": "$course",
                    "students": { $push: "$$ROOT" }
                }
            }
        ])

        //Góm nhóm học viên theo type [đúng, trễ, vắng, thừa]
        // on_time, late, redundant
        await listCheckin.forEach(function (course) {
            // Lấy id của khóa học đó
            const idCourse = course._id;

            // Lấy ra danh sách học viên của khóa học đó
            //const listStudentOfCourse = 

            // Gom nhóm các học viên của một khóa học theo type

            // for (const student of course.students) {
            //     const typeStudent = student.type;
            // }
        })
    }
}
