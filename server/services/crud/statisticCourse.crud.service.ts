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
        //console.log("params", params)

        // Của tất cả các khóa học
        if (params.course === "null") {
            let labels = [], dataAbsents = [],
                dataLates = [], dataOnTimes = [],
                dataRedundants = [],
                isEmpty = true

            // for (var i = 1; i <= 52; i++) {
            //     labels.push("T " + i)
            //     dataAbsents.push(0)
            //     dataLates.push(0)
            //     dataOnTimes.push(0)
            //     dataRedundants.push(0)
            // }

            const tempLineChart = await this.model.aggregate([
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

            tempLineChart.forEach(element => {
                switch (params.type) {
                    case "week":
                        labels.push("T " + element.labels)
                        break;

                    case "month":
                        labels.push("Th " + element.labels)
                        break;

                    case "year":
                        labels.push("Na " + element.labels)
                        break;
                }

                dataAbsents.push(element.totalAbsent)
                dataLates.push(element.totalLate)
                dataOnTimes.push(element.totalOnTime)
                dataRedundants.push(element.totalRedundant)

                isEmpty = false
            })

            return {
                labels: labels,
                dataAbsents: dataAbsents,
                dataLates: dataLates,
                dataOnTimes: dataOnTimes,
                dataRedundants: dataRedundants,
                isEmpty: isEmpty
            }

        }

        let labels = [], dataAbsents = [],
            dataLates = [], dataOnTimes = [],
            dataRedundants = [],
            isEmpty = true

        // Theo một khóa học
        const tempLineChart = await this.model.aggregate([
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

        tempLineChart.forEach(element => {
            switch (params.type) {
                case "week":
                    labels.push("T " + element.labels)
                    break;

                case "month":
                    labels.push("Th " + element.labels)
                    break;

                case "year":
                    labels.push("Na " + element.labels)
                    break;
            }

            dataAbsents.push(element.totalAbsent)
            dataLates.push(element.totalLate)
            dataOnTimes.push(element.totalOnTime)
            dataRedundants.push(element.totalRedundant)

            isEmpty = false
        })

        return {
            labels: labels,
            dataAbsents: dataAbsents,
            dataLates: dataLates,
            dataOnTimes: dataOnTimes,
            dataRedundants: dataRedundants,
            isEmpty: isEmpty
        }
    }

    async getDataInStatisticForPieChart(params: {
        course: string,
        type: "week" | "month" | "year",
        totalWeekStartTime: number,
        totalWeekEndTime: number
    }) {
        // Của tất cả các khóa học
        if (params.course === "null") {
            let labels = ["Vắng học", "Trễ giờ", "Đúng giờ", "Đi thừa"],
                data = [0, 0, 0, 0], totalAbsent = 0,
                totalLate = 0, totalOnTime = 0, totalRedundant = 0,
                isEmpty = true

            const tempDataPieChart = await this.model.aggregate([
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
                        _id: 0,
                        totalAbsent: 1,
                        totalLate: 1,
                        totalOnTime: 1,
                        totalRedundant: 1
                    }
                }
            ])

            if (tempDataPieChart.length > 0) {
                data[0] = tempDataPieChart[0].totalAbsent
                totalAbsent = tempDataPieChart[0].totalAbsent

                data[1] = tempDataPieChart[0].totalLate
                totalLate = tempDataPieChart[0].totalLate

                data[2] = tempDataPieChart[0].totalOnTime
                totalOnTime = tempDataPieChart[0].totalOnTime

                data[3] = tempDataPieChart[0].totalRedundant
                totalRedundant = tempDataPieChart[0].totalRedundant

                isEmpty = false
            }

            return {
                labels: labels,
                data: data,
                totalAbsent: totalAbsent,
                totalLate: totalLate,
                totalOnTime: totalOnTime,
                totalRedundant: totalRedundant,
                isEmpty: isEmpty
            }
        }

        let labels = ["Vắng học", "Trễ giờ", "Đúng giờ", "Đi thừa"],
            data = [0, 0, 0, 0], totalAbsent = 0,
            totalLate = 0, totalOnTime = 0, totalRedundant = 0,
            isEmpty = true

        // Theo một khóa học
        const tempDataPieChart = await this.model.aggregate([
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

        if (tempDataPieChart.length > 0) {
            data[0] = tempDataPieChart[0].totalAbsent
            totalAbsent = tempDataPieChart[0].totalAbsent

            data[1] = tempDataPieChart[0].totalLate
            totalLate = tempDataPieChart[0].totalLate

            data[2] = tempDataPieChart[0].totalOnTime
            totalOnTime = tempDataPieChart[0].totalOnTime

            data[3] = tempDataPieChart[0].totalRedundant
            totalRedundant = tempDataPieChart[0].totalRedundant

            isEmpty = false
        }

        return {
            labels: labels,
            data: data,
            totalAbsent: totalAbsent,
            totalLate: totalLate,
            totalOnTime: totalOnTime,
            totalRedundant: totalRedundant,
            isEmpty: isEmpty
        }
    }
}