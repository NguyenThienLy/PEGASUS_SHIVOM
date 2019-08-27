import * as moment from 'moment'

import { CrudController } from '../crud.controller'
import { regisCourseService, courseStudentService, mailService, studentService } from '../../services/index'
import { RegisCourseModel, CourseStudentModel, StudentModel, CourseModel } from '../../models';
import { notifyRegisCourseSuccessEmail } from '../../mailTemplate';


export class RegisCourseController extends CrudController<typeof regisCourseService>{
    constructor() {
        super(regisCourseService);
    }
    async enrollToCourse(params: {
        student: string
        regisCourseId: string
        package: string
        totalMonth: number
        startTime: string
    }) {
        let startTime = params.startTime
        let endTime = moment(startTime).add(params.totalMonth, "months").format()
        const regisCourse: RegisCourseModel = await this.service.getItem({
            filter: {
                _id: params.regisCourseId
            }, populates: ["student", "course"]
        })
        const student: StudentModel = await studentService.getItem({
            filter: {
                _id: params.student
            }
        })
        let result: any
        const currentCourseStudent = await courseStudentService.model.findOne({
            student: params.student,
            course: regisCourse.course
        })
        if (currentCourseStudent && moment(currentCourseStudent.endTime).isBefore(moment())) {
            // Truong hop hoc vien dang ky hoc tiep khoa hoc da ket thuc hoac gia han
            result = await currentCourseStudent.update({
                endTime: endTime,
                $inc: { totalMonth: params.totalMonth }
            }).exec()
        }
        else if (currentCourseStudent && moment(currentCourseStudent.endTime).isAfter(moment())) {
            // Truong hop hoc vien dang ky gia han khoa hoc
            endTime = moment(currentCourseStudent.endTime).add(params.totalMonth, "months").format()
            result = await currentCourseStudent.update({
                endTime: endTime,
                $inc: { totalMonth: params.totalMonth }
            }).exec()
        }
        else {
            // Truong hop hoc vien dang ky khoa hoc moi hoan toan
            result = await courseStudentService.create({
                student: params.student,
                course: regisCourse.course,
                package: params.package,
                totalMonth: params.totalMonth,
                startTime: params.startTime,
                endTime
            })
        }
        // Gui email den hoc vien dang ky khoa hoc thanh cong
        if (student.email) {
            const mailTemplate = await notifyRegisCourseSuccessEmail.buildTemplate([student.email], {
                name: `${student.firstName} ${student.lastName}`,
                startDay: moment(startTime).format("DD-MM-YYYY"),
                endDay: moment(endTime).format("DD-MM-YYYY"),
                courseName: (regisCourse.course as CourseModel).name
            })
            mailService.sendMail({ mailOption: mailTemplate })
        }
        await regisCourse.update({ isEnrolled: true }).exec()
        return result

    }

}