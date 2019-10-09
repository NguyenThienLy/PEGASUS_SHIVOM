import * as cron from 'node-cron'
import { UpdateStatisticCourseCronJob } from './updateStatisticCourse.cronjob.service'
import { UpdateStatisticStudentCronJob } from './updateStatisticStudent.cronjob.service'
import { UpdateCheckInsCronJob } from './updateCheckIns.cronjob.service'
import { StudentCronjobService } from './student.cronjob.service';

export class CronJobService {
    constructor() {
        this.updateStatisticCourse()
        this.updateStatisticStudent()
        //this.updateCheckIns()
        this.checkStudentBirthdayAndSendMail()
    }
    async checkStudentBirthdayAndSendMail() {
        cron.schedule('0 9 * * *', () => {
            StudentCronjobService.getInstance().checkStudentBirthdayAndSendMail()
        })
    }
    async checkStudentWillExpiredAndSendMail() {
        cron.schedule('30 8 * * *', () => {
            StudentCronjobService.getInstance().checkStudentWillExpiredAndSendMail()
        })
    }
    // Hàm ghi nhận dữ liệu để thống kê
    // Chạy lúc 1h 0 p
    async updateStatisticCourse() {
        cron.schedule('0 1 * * *', () => {
            UpdateStatisticCourseCronJob.getInstance().updateStatisticCourse()
        })
    }

    // Hàm ghi nhận dữ liệu để thống kê
    // Chạy lúc 1h 5 p
    async updateStatisticStudent() {
        cron.schedule('5 1 * * *', () => {
            UpdateStatisticStudentCronJob.getInstance().updateStatisticStudent();
        });
    }

    // Hàm xóa dữ liệu sau 7 ngày tồn tại trong bảng checkin
    // Chạy lúc 1h 10 p
    async updateCheckIns() {
        cron.schedule('10 1 * * *', () => {
            UpdateCheckInsCronJob.getInstance().updateCheckIns();
        });
    }
}