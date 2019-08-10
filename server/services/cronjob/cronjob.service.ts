import * as cron from 'node-cron'
import { UpdateStatisticClassCronJob  } from './updateStatisticClass.cronjob'
import { UpdateStatisticStudentCronJob } from './updateStatisticStudent.cronjob'

export class CronJobService {
    constructor() {
        this.updateStatisticClass()
        this.updateStatisticStudent()
    }

    // Hàm ghi nhận dữ liệu để thông kê
    async updateStatisticClass() {
        cron.schedule('* * * * *', () => {
            UpdateStatisticClassCronJob.getInstance().updateStatisticClass();
        });

        //await UpdateStatisticClassCronJob.getInstance().updateStatisticClass();
    }

    // Hàm ghi nhận dữ liệu để thông kê
    async updateStatisticStudent() {
        // cron.schedule('* * * * *', () => {
        //     UpdateStatisticStudentCronJob.getInstance().updateStatisticStudent();
        // });

        //UpdateStatisticStudentCronJob.getInstance().updateStatisticStudent();
    }
}