import { CrudService } from '../crud.service'
import { Checkin } from '../../models'
import { ObjectId } from 'bson'

export class CheckinService extends CrudService<typeof Checkin> {
    constructor() {
        super(Checkin);
    }

    async getDateInStatisticLine(params: {
        course: string
    }) {
        return await this.model.aggregate([
            // Lọc ra theo khóa học
            {
                $match: {
                    course: new ObjectId(params.course)
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date: "$checkinAt" } },
                    "totalAbsent": {
                        $sum: {
                            $cond: [{ $eq: ["$type", "absent"] }, 1, 0]
                        }
                    },
                    "totalLate": {
                        $sum: {
                            $cond: [{ $eq: ["$type", "late"] }, 1, 0]
                        }
                    },
                    "totalOnTime": {
                        $sum: {
                            $cond: [{ $eq: ["$type", "on_time"] }, 1, 0]
                        }
                    },
                    "totalRedundant": {
                        $sum: {
                            $cond: [{ $eq: ["$type", "redundant"] }, 1, 0]
                        }
                    }
                }
            },
            // Lấy ra các field cần trả về
            {
                $project: {
                    course: 1,
                    _id: 0,
                    labels: "$_id",
                    totalAbsent: 1,
                    totalLate: 1,
                    totalOnTime: 1,
                    totalRedundant: 1
                }
            },
            // Sắp xếp tăng dần theo thời gian
            {
                $sort: { labels: 1 }
            }
        ])
    }

    async getDateInStatisticPie(params: {
        course: string
    }) {
        return await this.model.aggregate([
            // Lọc ra theo khóa học
            {
                $match: {
                    course: new ObjectId(params.course)
                }
            },
            {
                $group: {
                    _id: null,
                    "totalAbsent": {
                        $sum: {
                            $cond: [{ $eq: ["$type", "absent"] }, 1, 0]
                        }
                    },
                    "totalLate": {
                        $sum: {
                            $cond: [{ $eq: ["$type", "late"] }, 1, 0]
                        }
                    },
                    "totalOnTime": {
                        $sum: {
                            $cond: [{ $eq: ["$type", "on_time"] }, 1, 0]
                        }
                    },
                    "totalRedundant": {
                        $sum: {
                            $cond: [{ $eq: ["$type", "redundant"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalAbsent: 1,
                    totalLate: 1,
                    totalOnTime: 1,
                    totalRedundant: 1
                }
            }
        ])
    }
}