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

    // Hàm cập nhật cho bảng checkin
    async updateCheckIns() {
        // Lấy ngày thứ 7 kể từ ngày hôm này
        const time = moment().subtract(7, "days").endOf("days").toDate()

        // Các dữ liệu muộn hơn 7 ngày trong bảng check in
        checkinService.model.remove({ checkinAt: { $lte: time } }).exec()
    }
}
