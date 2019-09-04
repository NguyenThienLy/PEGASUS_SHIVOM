import { CrudService } from '../crud.service'
import { StatisticCourse } from '../../models'
import { ObjectId } from 'bson'

export class StatisticCourseService extends CrudService<typeof StatisticCourse> {
    constructor() {
        super(StatisticCourse);
    }

    async getDataInStatisticForLineChart(params: {
        course: string,
        type: "week" | "month" | "year",
        totalWeekStartTime: number,
        totalWeekEndTime: number
    }) {
        // Của tất cả các khóa học
        if (params.course === "null")
            return await this.model.aggregate([
                // Lọc ra theo khóa học và type phù hợp
                {
                    $match: {
                        type: params.type
                    }
                },
                // Lấy ra các thuộc tính cần thiết
                {
                    $project: {
                        _id: 0,
                        labels: {
                            $switch: {
                                branches: [
                                    { case: { $and: [{ $eq: ["$type", "week"] }, { $eq: [params.type, "week"] }] }, then: "$time.week" },
                                    { case: { $and: [{ $eq: ["$type", "month"] }, { $eq: [params.type, "month"] }] }, then: "$time.month" },
                                    { case: { $and: [{ $eq: ["$type", "year"] }, { $eq: [params.type, "year"] }] }, then: "$time.year" }
                                ]
                            }
                        },
                        time: {
                            $switch: {
                                branches: [
                                    { case: { $and: [{ $eq: ["$type", "week"] }, { $eq: [params.type, "week"] }] }, then: { $add: ["$time.week", { $multiply: ["$time.year", 52] }] } },
                                    { case: { $and: [{ $eq: ["$type", "month"] }, { $eq: [params.type, "month"] }] }, then: { $add: [{ $multiply: [{ $subtract: ["$time.month", 1] }, 4] }, { $multiply: ["$time.year", 52] }] } },
                                    { case: { $and: [{ $eq: ["$type", "year"] }, { $eq: [params.type, "year"] }] }, then: { $multiply: ["$time.year", 52] } }
                                ]
                            }
                        },
                        totalAbsent: 1,
                        totalLate: 1,
                        totalOnTime: 1,
                        totalRedundant: 1
                    }
                },
                // Lọc ra các giá trị nằm trong khoảng thời gian
                {
                    $match: {
                        time: {
                            $gte: params.totalWeekStartTime,
                            $lte: params.totalWeekEndTime
                        }
                    }
                },
                // Góm nhóm theo group
                {
                    $group: {
                        _id: "$labels",
                        totalAbsent: { $sum: "$totalAbsent" },
                        totalLate: { $sum: "$totalLate" },
                        totalOnTime: { $sum: "$totalOnTime" },
                        totalRedundant: { $sum: "$totalRedundant" }
                    }
                },
                // Sắp xếp theo thời gian
                {
                    $sort: { _id: 1 }
                },
                // Loại bỏ field khi dùng xong
                {
                    $project: {
                        labels: "$_id",
                        _id: 0,
                        totalAbsent: 1,
                        totalLate: 1,
                        totalOnTime: 1,
                        totalRedundant: 1
                    }
                }
            ])

        // Theo một khóa học
        return await this.model.aggregate([
            // Lọc ra theo khóa học và type phù hợp
            {
                $match: {
                    course: new ObjectId(params.course),
                    type: params.type
                }
            },
            // Lấy ra các thuộc tính cần thiết
            {
                $project: {
                    _id: 0,
                    labels: {
                        $switch: {
                            branches: [
                                { case: { $and: [{ $eq: ["$type", "week"] }, { $eq: [params.type, "week"] }] }, then: "$time.week" },
                                { case: { $and: [{ $eq: ["$type", "month"] }, { $eq: [params.type, "month"] }] }, then: "$time.month" },
                                { case: { $and: [{ $eq: ["$type", "year"] }, { $eq: [params.type, "year"] }] }, then: "$time.year" }
                            ]
                        }
                    },
                    time: {
                        $switch: {
                            branches: [
                                { case: { $and: [{ $eq: ["$type", "week"] }, { $eq: [params.type, "week"] }] }, then: { $add: ["$time.week", { $multiply: ["$time.year", 52] }] } },
                                { case: { $and: [{ $eq: ["$type", "month"] }, { $eq: [params.type, "month"] }] }, then: { $add: [{ $multiply: [{ $subtract: ["$time.month", 1] }, 4] }, { $multiply: ["$time.year", 52] }] } },
                                { case: { $and: [{ $eq: ["$type", "year"] }, { $eq: [params.type, "year"] }] }, then: { $multiply: ["$time.year", 52] } }
                            ]
                        }
                    },
                    totalAbsent: 1,
                    totalLate: 1,
                    totalOnTime: 1,
                    totalRedundant: 1
                }
            },
            // Lọc ra các giá trị nằm trong khoảng thời gian
            {
                $match: {
                    time: {
                        $gte: params.totalWeekStartTime,
                        $lte: params.totalWeekEndTime
                    }
                }
            },
            // Sắp xếp theo thời gian
            {
                $sort: { labels: 1 }
            },
            // Loại bỏ field khi dùng xong
            {
                $project: {
                    time: 0
                }
            }
        ])
    }

    async getDataInStatisticForPieChart(params: {
        course: string,
        type: "week" | "month" | "year",
        totalWeekStartTime: number,
        totalWeekEndTime: number
    }) {
        // Của tất cả các khóa học
        if (params.course === "null")
            return await this.model.aggregate([
                // Lọc ra theo khóa học và type phù hợp
                {
                    $match: {
                        type: params.type
                    }
                },
                // Lấy ra các thuộc tính cần thiết
                {
                    $project: {
                        _id: 0,
                        time: {
                            $switch: {
                                branches: [
                                    { case: { $and: [{ $eq: ["$type", "week"] }, { $eq: [params.type, "week"] }] }, then: { $add: ["$time.week", { $multiply: ["$time.year", 52] }] } },
                                    { case: { $and: [{ $eq: ["$type", "month"] }, { $eq: [params.type, "month"] }] }, then: { $add: [{ $multiply: [{ $subtract: ["$time.month", 1] }, 4] }, { $multiply: ["$time.year", 52] }] } },
                                    { case: { $and: [{ $eq: ["$type", "year"] }, { $eq: [params.type, "year"] }] }, then: { $multiply: ["$time.year", 52] } }
                                ]
                            }
                        },
                        totalAbsent: 1,
                        totalLate: 1,
                        totalOnTime: 1,
                        totalRedundant: 1
                    }
                },
                // Lọc ra các giá trị nằm trong khoảng thời gian
                {
                    $match: {
                        time: {
                            $gte: params.totalWeekStartTime,
                            $lte: params.totalWeekEndTime
                        }
                    }
                },
                //Tính theo tổng hết tất cả field
                {
                    $group: {
                        _id: null,
                        totalAbsent: { $sum: "$totalAbsent" },
                        totalLate: { $sum: "$totalLate" },
                        totalOnTime: { $sum: "$totalOnTime" },
                        totalRedundant: { $sum: "$totalRedundant" }
                    }
                },
                // Loại bỏ field khi dùng xong
                {
                    $project: {
                        _id: 0
                    }
                }
            ])

        // Theo một khóa học
        return await this.model.aggregate([
            // Lọc ra theo khóa học và type phù hợp
            {
                $match: {
                    course: new ObjectId(params.course),
                    type: params.type
                }
            },
            // Lấy ra các thuộc tính cần thiết
            {
                $project: {
                    _id: 0,
                    time: {
                        $switch: {
                            branches: [
                                { case: { $and: [{ $eq: ["$type", "week"] }, { $eq: [params.type, "week"] }] }, then: { $add: ["$time.week", { $multiply: ["$time.year", 52] }] } },
                                { case: { $and: [{ $eq: ["$type", "month"] }, { $eq: [params.type, "month"] }] }, then: { $add: [{ $multiply: [{ $subtract: ["$time.month", 1] }, 4] }, { $multiply: ["$time.year", 52] }] } },
                                { case: { $and: [{ $eq: ["$type", "year"] }, { $eq: [params.type, "year"] }] }, then: { $multiply: ["$time.year", 52] } }
                            ]
                        }
                    },
                    totalAbsent: 1,
                    totalLate: 1,
                    totalOnTime: 1,
                    totalRedundant: 1
                }
            },
            // Lọc ra các giá trị nằm trong khoảng thời gian
            {
                $match: {
                    time: {
                        $gte: params.totalWeekStartTime,
                        $lte: params.totalWeekEndTime
                    }
                }
            },
            //Tính theo tổng hết tất cả field
            {
                $group: {
                    _id: null,
                    totalAbsent: { $sum: "$totalAbsent" },
                    totalLate: { $sum: "$totalLate" },
                    totalOnTime: { $sum: "$totalOnTime" },
                    totalRedundant: { $sum: "$totalRedundant" }
                }
            },
            // Loại bỏ field khi dùng xong
            {
                $project: {
                    _id: 0
                }
            }
        ])
    }
}