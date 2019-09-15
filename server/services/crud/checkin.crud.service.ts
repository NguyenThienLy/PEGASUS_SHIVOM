import { CrudService } from '../crud.service'
import { Checkin } from '../../models'
import { ObjectId } from 'bson'
import { format } from 'util'
import * as _ from 'lodash'

export class CheckinService extends CrudService<typeof Checkin> {
    constructor() {
        super(Checkin);
    }

    async getDataInStatisticForLineChart(params: {
        course: string
    }) {
        let labels = [], dataAbsents = [],
            dataLates = [], dataOnTimes = [],
            dataRedundants = [],
            isEmpty = true

        const tempLineChart = await this.model.aggregate([
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

        tempLineChart.forEach(element => {
            labels.push(element.labels)

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

    async getDataInStatisticForListDetail(params: {
        course: string
    }) {

        let absents = [], lates = [], onTimes = [], redundants = []

        const tempListStudent = await this.model.aggregate([
            {
                $match: {
                    // Chỉ lấy ra khóa học truyền vào
                    course: { $eq: new ObjectId(params.course) }
                }
            },
            {
                $group: {
                    _id: "$student",
                    formats: {
                        $push: { time: "$checkinAt", type: "$type" }
                    }
                }
            },
            // Kết với docs courseStudents
            {
                $lookup: {
                    from: "coursestudents",
                    localField: "_id",
                    foreignField: "student",
                    as: "coursesStudents_docs"
                }
            },
            // Kết với docs students
            {
                $lookup: {
                    from: "students",
                    localField: "_id",
                    foreignField: "_id",
                    as: "students_docs"
                }
            },
            // Lấy ra các thuộc tính cần thiết
            {
                $project: {
                    student: "$_id",
                    _id: 0,
                    absents: {
                        // Lọc theo lớp học
                        $filter: {
                            input: "$formats",
                            as: "element",
                            cond: { $eq: ["$$element.type", "absent"] }
                        }
                    },
                    lates: {
                        // Lọc theo lớp học
                        $filter: {
                            input: "$formats",
                            as: "element",
                            cond: { $eq: ["$$element.type", "late"] }
                        }
                    },
                    onTimes: {
                        // Lọc theo lớp học
                        $filter: {
                            input: "$formats",
                            as: "element",
                            cond: { $eq: ["$$element.type", "on_time"] }
                        }
                    },
                    redundants: {
                        // Lọc theo lớp học
                        $filter: {
                            input: "$formats",
                            as: "element",
                            cond: { $eq: ["$$element.type", "redundant"] }
                        }
                    },
                    // Lấy các trường của khóa học của học sinh
                    "coursesStudents_docs.student": 1,
                    "coursesStudents_docs.course": 1,
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
                    //  formats: 0
                }
            },
            {
                $unwind: "$coursesStudents_docs"
            },
            {
                $match: {
                    // Chỉ lấy ra khóa học truyền vào
                    "coursesStudents_docs.course": { $eq: new ObjectId(params.course) }
                }
            },
            {
                $project: {
                    "absents.type": 0,
                    "lates.type": 0,
                    "onTimes.type": 0,
                    "redundants.type": 0,
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
}