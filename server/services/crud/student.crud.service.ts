import { CrudService } from '../crud.service'
import { Student, StudentModel } from '../../models'
import { ObjectId } from 'bson'
import { format } from 'path';
import * as _ from 'lodash'

export class StudentService extends CrudService<typeof Student> {
    constructor() {
        super(Student);
    }

    async getDateInStatisticForColumnChart(params: {
        course: string,
        totalWeekStartTime: number,
        totalWeekEndTime: number
    }) {

        return await this.model.aggregate([
            // Lấy ra các thuộc tính cần thiết
            {
                $project: {
                    labels: "$time.month",
                    time: { $add: [{ $multiply: [{ $subtract: ["$time.month", 1] }, 4] }, { $multiply: ["$time.year", 52] }] }
                }
            },
            // Lọc ra các giá trị nằm trong khoảng thời gian và loại bỏ các phần tử
            // Có format bằng trống
            {
                $match: {
                    time: {
                        $gte: params.totalWeekStartTime,
                        $lte: params.totalWeekEndTime
                    },
                    // Không lấy các giá trị rỗng
                    //formats: { $ne: [] }
                }
            },
            {
                $group: {
                    _id: "$labels",
                    total: { $sum: 1 }
                    // "1": {
                    //     $sum: {
                    //         $cond: [{ $eq: ["$labels", "1"] }, 1, 0]
                    //     }
                    // }
                }
            },
            {
                $project: {
                    labels: "$_id",
                    _id: 0,
                    total: 1
                }
            },
            {
                $sort: { labels: 1 }
            }
        ])
    }
}