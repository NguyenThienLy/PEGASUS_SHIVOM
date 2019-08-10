import { classService, studentService, checkinService } from '../index'
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

        // const listCheckin = await checkinService.getList({
        //     filter: {
        //         $and: [
        //             { checkinAt: { $gte: startTime } },
        //             { checkinAt: { $lte: endTime } }
        //         ]
        //     },
        // });
        // const listCheckin = await checkinService.model.aggregate(
        //     [
        //         {
        //             $filter: {
        //                 $and: [
        //                     { checkinAt: { $gte: startTime } },
        //                     { checkinAt: { $lte: endTime } }
        //                 ]
        //             }
        //             // $group: {
        //             //     _id: null,
        //             //     totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
        //             //     averageQuantity: { $avg: "$quantity" },
        //             //     count: { $sum: 1 }
        //             // }
        //         }
        //     ]
        // )

        //console.log(listCheckin);
    }
}
