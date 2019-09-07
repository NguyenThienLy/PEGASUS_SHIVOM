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
        totalWeekStartTime: number,
        totalWeekEndTime: number
    }) {
        let absents = [], lates = [], onTimes = [], redundants = []

        const tempListStudent = await this.model.aggregate([
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
                    absents: {
                        $filter: {
                            input: "$absent",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    lates: {
                        $filter: {
                            input: "$late",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    onTimes: {
                        $filter: {
                            input: "$onTime",
                            as: "element",
                            cond: { $eq: ["$$element.course", new ObjectId(params.course)] }
                        }
                    },
                    redundants: {
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
            // Loại bỏ các field thừa
            {
                $project: {
                    _id: 0,
                    time: 0,
                    "absents.course": 0,
                    "lates.course": 0,
                    "onTimes.course": 0,
                    "redundants.course": 0
                }
            }
        ])

        // Phân loại theo format: absent, late, onTime, redundant
        tempListStudent.forEach(item => {
            if (item.absents.length > 0) {
                absents.push(_.omit(item, ['lates', 'onTimes', 'redundants']))
            }

            if (item.lates.length > 0) {
                lates.push(_.omit(item, ['absents', 'onTimes', 'redundants']))
            }

            if (item.onTimes.length > 0) {
                onTimes.push(_.omit(item, ['absents', 'lates', 'redundants']))
            }

            if (item.redundants.length > 0) {
                redundants.push(_.omit(item, ['absents', 'lates', 'onTimes']))
            }
        })

        return {
            absents: absents,
            lates: lates,
            onTimes: onTimes,
            redundants: redundants
        }
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
        _.flatten(tempTimeLine[0].absent).forEach(item => {
            timeLine.push({ time: item, type: "absent" })
        })

        // Đẩy element type late vào arr timeLine
        _.flatten(tempTimeLine[0].late).forEach(item => {
            timeLine.push({ time: item, type: "late" })
        })

        // Đẩy element type on_time vào arr timeLine
        _.flatten(tempTimeLine[0].onTime).forEach(item => {
            timeLine.push({ time: item, type: "on_time" })
        })

        // Đẩy element type redundant vào arr timeLine
        _.fltten(tempTimeLine[0].redundant).forEach(item => {
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
            // Tính số lượng phần tử của array
            {
                $project: {
                    totalAbsent: { $size: "$absent" },
                    totalLate: { $size: "$late" },
                    totalOnTime: { $size: "$onTime" },
                    totalRedundat: { $size: "$redundant" }
                }
            },
            // Group theo nhóm
            {
                $group: {
                    _id: null,
                    totalAbsent: { $sum: "$totalAbsent" },
                    totalLate: { $sum: "$totalLate" },
                    totalOnTime: { $sum: "$totalOnTime" },
                    totalRedundat: { $sum: "$totalRedundant" },
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