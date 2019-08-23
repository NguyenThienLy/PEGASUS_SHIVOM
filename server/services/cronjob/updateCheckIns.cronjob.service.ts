import { checkinService } from '../index'
import * as moment from 'moment'
import * as _ from 'lodash'

export class UpdateCheckInsCronJob {
    constructor() {
    }
    static instance: UpdateCheckInsCronJob
    static getInstance(): UpdateCheckInsCronJob {
        if (!this.instance) {
            this.instance = new UpdateCheckInsCronJob()
        }
        return this.instance
    }
    // Hàm ghi nhận dữ liệu để thông kê cho khóa học
    async updateCheckIns() {

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

    }
}
