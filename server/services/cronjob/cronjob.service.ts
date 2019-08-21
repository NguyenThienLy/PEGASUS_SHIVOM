import * as cron from 'node-cron'
import { UpdateStatisticCronJob  } from './updateStatistic.cronjob.service'
import { UpdateStatisticStudentCronJob } from './updateStatisticStudent.cronjob.service'

export class CronJobService {
    constructor() {
        this.updateStatistic()
        this.updateStatisticStudent()
    }

    // Hàm ghi nhận dữ liệu để thông kê
    async updateStatistic() {
        cron.schedule('* * * * *', () => {
            UpdateStatisticCronJob.getInstance().updateStatistic()
        })

       // await UpdateStatisticClassCronJob.getInstance().updateStatisticClass();

       // await UpdateStatisticClassCronJob.getInstance().updateStatisticClass()
    }

    // Hàm ghi nhận dữ liệu để thông kê
    async updateStatisticStudent() {
        // cron.schedule('* * * * *', () => {
        //     UpdateStatisticStudentCronJob.getInstance().updateStatisticStudent();
        // });

        //UpdateStatisticStudentCronJob.getInstance().updateStatisticStudent();
    }
}