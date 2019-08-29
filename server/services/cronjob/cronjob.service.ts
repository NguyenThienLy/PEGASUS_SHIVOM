import * as cron from 'node-cron'
import { UpdateStatisticCourseCronJob } from './updateStatisticCourse.cronjob.service'
import { UpdateStatisticStudentCronJob } from './updateStatisticStudent.cronjob.service'
import { UpdateCheckInsCronJob } from './updateCheckIns.cronjob.service'
import { StudentCronjobService } from './student.cronjob.service';

export class CronJobService {
    constructor() {
        // this.updateStatisticCourse()
        // this.updateStatisticStudent()
        // this.updateCheckIns()
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
    async updateStatisticCourse() {
        cron.schedule('0 1 * * *', () => {
            UpdateStatisticCourseCronJob.getInstance().updateStatisticCourse()
        })
    }

    // Hàm ghi nhận dữ liệu để thống kê
    async updateStatisticStudent() {
        cron.schedule('0 2 * * *', () => {
            UpdateStatisticStudentCronJob.getInstance().updateStatisticStudent();
        });
    }

    // Hàm xóa dữ liệu sau 7 ngày tồn tại trong bảng checkin
    async updateCheckIns() {
        cron.schedule('* * * * *', () => {
            UpdateCheckInsCronJob.getInstance().updateCheckIns();
        });
    }
}