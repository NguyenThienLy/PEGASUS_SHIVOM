import * as moment from 'moment'
import * as _ from 'lodash'
import { courseStudentService, mailService, studentService, activityService } from '..';
import { remindExtendCourseEmail, congratulationBirthdayEmail } from '../../mailTemplate';

export class StudentCronjobService {
    constructor() {

    }
    static instance: StudentCronjobService
    static getInstance(): StudentCronjobService {
        if (!this.instance) {
            this.instance = new StudentCronjobService()
        }
        return this.instance
    }
    async checkStudentBirthdayAndSendMail() {
        const today = moment().toDate();
        const listStudents = await studentService.model.aggregate([{
            $addFields: {
                today: { $dateFromParts: { year: { $year: today }, month: { $month: today }, day: { $dayOfMonth: today } } },
                birthdayThisYear: { $dateFromParts: { year: { $year: today }, month: { $month: "$birthday" }, day: { $dayOfMonth: "$birthday" } } },
                birthdayNextYear: { $dateFromParts: { year: { $add: [1, { $year: today }] }, month: { $month: "$birthday" }, day: { $dayOfMonth: "$birthday" } } }
            }
        }, {
            $addFields: {
                nextBirthday: { $cond: [{ $gte: ["$birthdayThisYear", "$today"] }, "$birthdayThisYear", "$birthdayNextYear"] }
            }
        }, {
            $project: {
                name: 1,
                birthday: 1,
                daysTillNextBirthday: {
                    $divide: [
                        { $subtract: ["$nextBirthday", "$today"] },
                        24 * 60 * 60 * 1000  /* milliseconds in a day */
                    ]
                },
                _id: 1
            }
        }, {
            $match: {
                daysTillNextBirthday: { $gte: 0, $lt: 30 }
            }
        }, { $sort: { daysTillNextBirthday: 1 } }]);
        for (const student of listStudents) {
            try {
                studentService.update({ $inc: { point: 1 } }, { filter: { _id: student._id } })
                activityService.create({
                    student: student._id,
                    point: 3,
                    type: "birthday",
                    content: "Cộng điểm chúc mừng sinh nhật"
                })
            } catch (err) {

            }
            // if (student.email) {
            //     const mailTemplate = await congratulationBirthdayEmail.buildTemplate([student.email], {
            //         name: `${student.firstName} ${student.lastName}`
            //     })
            //     mailService.sendMail({ mailOption: mailTemplate })
            // }
        }
        return listStudents

    }
    async checkStudentWillExpiredAndSendMail() {
        // const startDay = moment().dayOfYear()
        const endDay = moment().add(1, "days").dayOfYear()
        const startDay = moment().add(7, "days").dayOfYear()
        const year = moment().year()
        const courseStudents = await courseStudentService.model.aggregate([
            {
                $project: {
                    endDay: { $dayOfYear: "$endTime" },
                    year: { $year: "$endTime" },
                    student: 1,
                    course: 1,
                    status: 1,
                    endTime: 1
                }
            }, {
                $match: {
                    $or: [
                        {
                            endDay: startDay,
                            status: "active",
                            year: year
                        }, {
                            endDay: endDay,
                            status: "active",
                            year: year
                        }]
                }
            }, {
                $lookup: {
                    from: "students",
                    localField: "student",
                    foreignField: "_id",
                    as: "student"
                }
            }, {
                $lookup: {
                    from: "courses",
                    localField: "course",
                    foreignField: "_id",
                    as: "course"
                }
            },
            {
                $unwind: "$course"
            }, {
                $unwind: "$student"
            }
        ])
        for (const courseStudent of courseStudents) {
            if (courseStudent.student.email) {
                const mailTemplate = await remindExtendCourseEmail.buildTemplate([courseStudent.student.email], {
                    name: `${courseStudent.student.firstName} ${courseStudent.student.lastName}`,
                    endDay: moment(courseStudent.endTime).format("DD-MM-YYYY"),
                    courseName: courseStudent.course.name
                })
                mailService.sendMail({ mailOption: mailTemplate })
            }
        }
        return
    }
}