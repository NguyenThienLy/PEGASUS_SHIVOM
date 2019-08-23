import * as cron from 'node-cron'
import { UpdateStatisticCourseCronJob } from './updateStatisticCourse.cronjob.service'
import { UpdateStatisticStudentCronJob } from './updateStatisticStudent.cronjob.service'
import { UpdateCheckInsCronJob } from './updateCheckIns.cronjob.service'

export class CronJobService {
    constructor() {
        this.updateStatistic()
        this.updateStatisticStudent()
        this.updateCheckIns()
    }

    // Hàm ghi nhận dữ liệu để thống kê
    async updateStatistic() {
        cron.schedule('* * * * *', () => {
            UpdateStatisticCourseCronJob.getInstance().updateStatisticCourse()
        })
    }

    // Hàm ghi nhận dữ liệu để thống kê
    async updateStatisticStudent() {
        cron.schedule('* * * * *', () => {
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