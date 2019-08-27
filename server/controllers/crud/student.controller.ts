import * as _ from 'lodash'
import * as moment from 'moment'

import { CrudController } from '../crud.controller'
import { studentService, ICrudOption, courseStudentService, classTimeTableService, errorService, classService, checkinService, mailService, tokenService } from '../../services'
import { CourseStudentModel, StudentModel, CourseModel } from '../../models';
import { webhookController } from '..';
import { replyFeedbackEmail, remindExtendCourseEmail } from '../../mailTemplate';


export class StudentController extends CrudController<typeof studentService>{
    constructor() {
        super(studentService);
    }
    async updateCard(params: {
        studentId: string,
        code: string
    }) {
        return await this.service.update({
            cardId: params.code
        }, {
                filter: {
                    _id: params.studentId
                }
            })
    }
    async login(params: {
        phone: string
        password: string
    }) {
        const { phone, password } = params
        const student = await this.service.getItem({
            filter: {
                phone: phone
            }
        })
        const isMatch: boolean = await student.comparePassword(password)
        if (!isMatch) throw errorService.auth.permissionDenied()
        const token = await tokenService.getStudentToken({ _id: student._id })
        const json = student.toJSON()
        json.accessToken = token
        return json
    }
    async sendMailUpcommingExpired(params: {
        courseStudentIds: string[]
    }) {
        const { courseStudentIds } = params
        const listCourseStudents = await courseStudentService.model.find({
            _id: { $in: courseStudentIds }
        }).select(["_id"]).populate(["student", "course"])
        for (const listCourseStudent of listCourseStudents) {
            const mailTemplate = await remindExtendCourseEmail.buildTemplate([(listCourseStudent.student as StudentModel).email], {
                name: `${(listCourseStudent.student as StudentModel).firstName} ${(listCourseStudent.student as StudentModel).lastName}`,
                endDay: moment(listCourseStudent.endTime).format("DD-MM-YYYY"),
                courseName: (listCourseStudent.course as CourseModel).name
            })
            mailService.sendMail({ mailOption: mailTemplate })
        }
        return listCourseStudents
    }
    async getListStudentUpcommingExpired(params: {
        startTime?: string
        endTime?: string
    }, option: ICrudOption) {
        if (!params.startTime) params.startTime = moment().format()
        if (!params.endTime) params.endTime = moment().add(7, "days").format()
        const startDay = moment(params.startTime).dayOfYear()
        const endDay = moment(params.endTime).dayOfYear()
        return await courseStudentService.getList(_.merge(option, {
            filter: {
                endTime: { $gte: params.startTime, $lte: params.endTime }
            },
            populates: ["course", "student"]
        }))
    }
    async search(params: {
        phone: string
    }, option: ICrudOption) {
        return await this.service.getList(_.merge({
            filter: {
                phone: { $regex: params.phone, $options: "si" }
            }
        }, option))
    }
    async checkin(params: {
        studentId: string
    }) {
        const student: StudentModel = await this.service.getItem({
            filter: {
                _id: params.studentId
            }
        })
        const timestamps = moment().format("x")
        const result = await webhookController.checkStudentTimeTable({
            student, timestamps
        })
        return await checkinService.getItem({
            filter: {
                _id: result._id
            }, populates: ["course", "class", "timeTableItem"]
        })
    }
    async getListStudentUpcommingBirthday(params: {
        startTime?: string
        endTime?: string
    }, option: ICrudOption) {
        if (!params.startTime) params.startTime = moment().format()
        if (!params.endTime) params.endTime = moment().add(1, "months").format()
        const startDay = moment(params.startTime).dayOfYear()
        const endDay = moment(params.endTime).dayOfYear()
        const listStudent = await this.service.model.aggregate([
            {
                $project: {
                    day: { $dayOfYear: "$birthday" }
                }
            }, {
                $match: {
                    day: { $gte: startDay, $lte: endDay }
                }
            }
        ])
        return await this.service.getList(_.merge(option, {
            filter: {
                _id: { $in: listStudent.map((student: any) => { return student._id }) }
            }
        }))
    }
    async getListClassOfStudent(params: {
        studentId: string
    }, option: ICrudOption) {
        const coursesOfStudent = await courseStudentService.model.find({
            student: params.studentId
        })
        return await classService.getList({
            filter: { course: { $in: coursesOfStudent.map((courseOfStudent: CourseStudentModel) => { return courseOfStudent.course }) } }
        })
    }
    async getTimeTableOfStudentByCourse(params: {
        courseId: string
        studentId: string
    }, option: ICrudOption) {
        const { courseId, studentId } = params
        // Kiem tra hoc vien co dang ky hoc khoa hoc do khong
        const courseOfStudent = await courseStudentService.model.findOne({
            student: studentId,
            course: courseId
        })
        if (!courseOfStudent) {
            throw errorService.student.courseHaventApplied()
        }
        // Lay danh sach thoi khoa bieu cua hoc sinh theo mot khoa hoc nao do voi day du thong tin ve cac lop, giao vien cua lop
        const { rows: classTimeTables } = await classTimeTableService.getList(_.merge({
            filter: {
                course: courseId
            },
            populates: ["items", { path: "class", populate: ["teacher"] }]
        }, option))
        return classTimeTables
    }
    async getTimeTableOfStudent(params: {
        studentId: string
    }, option: ICrudOption) {
        const { studentId } = params
        // Lay danh sach khoa hoc ma hoc vien co tham gia
        const coursesOfStudent = await courseStudentService.model.find({
            student: studentId
        })
        // Lay danh sach tat ca thoi khoa bieu cua hoc sinh voi day du thong tin ve cac lop, giao vien cua lop
        const { rows: classTimeTables } = await classTimeTableService.getList(_.merge({
            filter: {
                course: coursesOfStudent.map((coursesOfStudent: CourseStudentModel) => { return coursesOfStudent.course })
            },
            populates: ["items", { path: "class", populate: ["teacher"] }]
        }, option))
        return classTimeTables
    }

}