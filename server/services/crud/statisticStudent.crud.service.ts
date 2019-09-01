import { CrudService } from '../crud.service'
import { StatisticStudent } from '../../models'
import { ObjectId } from 'bson'
import { format } from 'path';
import * as _ from 'lodash'

export class StatisticStudentService extends CrudService<typeof StatisticStudent> {
    constructor() {
        super(StatisticStudent);
    }

    async getDateInStatisticForListDetail(params: {
        course: string,
        type: "week" | "month" | "year",
        format: "absent" | "late" | "on_time" | "redundant"
        totalWeekStartTime: number,
        totalWeekEndTime: number
    }) {
        return await this.model.aggregate([
            // Kết với docs courseStudents
            {
                $lookup: {
                    from: "coursestudents",
                    localField: "student",
                    foreignField: "student",
                    as: "coursesStudents_docs"
                }
            },
            // Kết với docs students
            {
                $lookup: {
                    from: "students",
                    localField: "student",
                    foreignField: "_id",
                    as: "students_docs"
                }
            },
            // Lọc ra theo khóa học và type phù hợp
            {
                $match: {
                    type: params.type,
                    // Chỉ lấy ra khóa học truyền vào
                    "coursesStudents_docs.course": { $eq: new ObjectId(params.course) }
                }
            },
            // Lấy ra các thuộc tính cần thiết
            {
                $project: {
                    student: 1,
                    // Lấy các trường của khóa học của học sinh
                    "coursesStudents_docs.totalFeeAmount": 1,
                    "coursesStudents_docs.totalDiscountAmount": 1,
                    "coursesStudents_docs.totalMonthAmount": 1,
                    "coursesStudents_docs.totalLesson": 1,
                    "coursesStudents_docs.totalLessonUsed": 1,
                    "coursesStudents_docs.totalAbsent": 1,
                    "coursesStudents_docs.totalAbsentPermitted": 1,
                    // Lấy các trường của thông tin học sinh
                    "students_docs.firstName": 1,
                    "students_docs.lastName": 1,
                    "students_docs.avatar": 1,
                    "students_docs.phone": 1,
                    "students_docs.email": 1,
                    "students_docs.rank": 1,
                    // Lấy ra đúng cột theo format và lọc ra theo khóa học truyền vào
                    formats: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: [params.format, "absent"] }, then: {
                                        $filter: {
                                            input: "$absent",
                                            as: "element",
                                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                                        }
                                    }
                                },
                                {
                                    case: { $eq: [params.format, "late"] }, then: {
                                        $filter: {
                                            input: "$late",
                                            as: "element",
                                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                                        }
                                    }
                                },
                                {
                                    case: { $eq: [params.format, "on_time"] }, then: {
                                        $filter: {
                                            input: "$onTime",
                                            as: "element",
                                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                                        }
                                    }
                                },
                                {
                                    case: { $eq: [params.format, "redundant"] }, then: {
                                        $filter: {
                                            input: "$redundant",
                                            as: "element",
                                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                                        }
                                    }
                                }
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
                    }
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
                    formats: { $ne: [] }
                }
            },
            // Loại bỏ các field thừa
            {
                $project: {
                    _id: 0,
                    time: 0,
                    "formats.course": 0
                }
            }
        ])
    }

    async getDateInStatisticForCalendarChart(params: {
        student: string,
        course: string,
        type: "week" | "month" | "year",
        totalWeekStartTime: number,
        totalWeekEndTime: number
    }) {
        let timeLine = []

        const tempTimeLine = await this.model.aggregate([
            // Lọc ra theo khóa học và type phù hợp
            {
                $match: {
                    type: params.type,
                    student: new ObjectId(params.student)
                }
            },
            // Lấy ra các thuộc tính cần thiết
            {
                $project: {
                    student: 1,
                    absent: {
                        // Lọc theo lớp học
                        $filter: {
                            input: "$absent",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    late: {
                        $filter: {
                            input: "$late",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    onTime: {
                        $filter: {
                            input: "$onTime",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    redundant: {
                        $filter: {
                            input: "$redundant",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
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
                    }
                }
            },
            // Lọc ra các giá trị nằm trong khoảng thời gian và loại bỏ các phần tử
            {
                $match: {
                    time: {
                        $gte: params.totalWeekStartTime,
                        $lte: params.totalWeekEndTime
                    }
                }
            },
            // Group theo nhóm
            {
                $group: {
                    _id: "$student",
                    absent: { $push: "$absent.time" },
                    late: { $push: "$late.time" },
                    onTime: { $push: "$onTime.time" },
                    redundant: { $push: "$redundant.time" },
                }
            },
            // Bỏ id
            {
                $project: {
                    _id: 0
                }
            }
        ])

        // Đẩy element type absent vào arr timeLine
        _.map(_.flatten(tempTimeLine[0].absent), function (item) {
            timeLine.push({ time: item, type: "absent" })
        })

        // Đẩy element type late vào arr timeLine
        _.map(_.flatten(tempTimeLine[0].late), function (item) {
            timeLine.push({ time: item, type: "late" })
        })

        // Đẩy element type on_time vào arr timeLine
        _.map(_.flatten(tempTimeLine[0].onTime), function (item) {
            timeLine.push({ time: item, type: "on_time" })
        })

        // Đẩy element type redundant vào arr timeLine
        _.map(_.flatten(tempTimeLine[0].redundant), function (item) {
            timeLine.push({ time: item, type: "redundant" })
        })

        return {
            absents: _.flatten(tempTimeLine[0].absent),
            lates: _.flatten(tempTimeLine[0].late),
            onTimes: _.flatten(tempTimeLine[0].onTime),
            redundants: _.flatten(tempTimeLine[0].redundant),
            timeLines: timeLine
        }
    }

    async getDateInStatisticForPieChart(params: {
        student: string,
        course: string,
        type: "week" | "month" | "year",
        totalWeekStartTime: number,
        totalWeekEndTime: number
    }) {

        console.log(params)

        return await this.model.aggregate([
            // Lọc ra theo khóa học và type phù hợp
            {
                $match: {
                    type: params.type,
                    student: new ObjectId(params.student)
                }
            },
            // Lấy ra các thuộc tính cần thiết
            {
                $project: {
                    student: 1,
                    absent: {
                        // Lọc theo lớp học
                        $filter: {
                            input: "$absent",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    late: {
                        $filter: {
                            input: "$late",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    onTime: {
                        $filter: {
                            input: "$onTime",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    redundant: {
                        $filter: {
                            input: "$redundant",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
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
                    }
                }
            },
            // Lọc ra các giá trị nằm trong khoảng thời gian và loại bỏ các phần tử
            {
                $match: {
                    time: {
                        $gte: params.totalWeekStartTime,
                        $lte: params.totalWeekEndTime
                    }
                }
            },
            {
                totalAbsent: { $sum: "$absent" },
                totalLate: { $sum: "$late" },
                totalOnTime: { $sum: "$onTime" },
                totalRedundat: { $sum: "$Redundant" },
            },
            // Group theo nhóm
            {
                $group: {
                    _id: "$student",
                    absent: { $push: "$absent.time" },
                    late: { $push: "$late.time" },
                    onTime: { $push: "$onTime.time" },
                    redundant: { $push: "$redundant.time" },
                }
            },
            // Bỏ id
            {
                $project: {
                    _id: 0
                }
            }
        ])
    }
}