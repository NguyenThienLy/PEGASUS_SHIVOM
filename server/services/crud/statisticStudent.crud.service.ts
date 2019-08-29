import { CrudService } from '../crud.service'
import { StatisticStudent } from '../../models'
import { ObjectId } from 'bson'
import { format } from 'path';

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
                                            as: "absent",
                                            cond: { $eq: ["$$absent.course", new ObjectId(params.course)] }
                                        }
                                    }
                                },
                                {
                                    case: { $eq: [params.format, "late"] }, then: {
                                        $filter: {
                                            input: "$late",
                                            as: "late",
                                            cond: { $eq: ["$$late.course", new ObjectId(params.course)] }
                                        }
                                    }
                                },
                                {
                                    case: { $eq: [params.format, "on_time"] }, then: {
                                        $filter: {
                                            input: "$on_time",
                                            as: "on_time",
                                            cond: { $eq: ["$$on_time.course", new ObjectId(params.course)] }
                                        }
                                    }
                                },
                                {
                                    case: { $eq: [params.format, "redundant"] }, then: {
                                        $filter: {
                                            input: "$redundant",
                                            as: "redundant",
                                            cond: { $eq: ["$$redundant.course", new ObjectId(params.course)] }
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
}