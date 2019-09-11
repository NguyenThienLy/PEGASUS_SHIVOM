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
        let labels = ["Th 1", "Th 2", "Th 3", "Th 4", "Th 5", "Th 7", "Th 8", "Th 9", "Th 10", "Th 11", "Th 12"],
            data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        const tempQuantityStudent = await this.model.aggregate([
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

        tempQuantityStudent.forEach(element => {
            data[element.labels - 1] = element.total
        })

        return {
            labels: labels,
            data: data
        }
    }
}