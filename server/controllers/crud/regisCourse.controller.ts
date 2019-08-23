import * as moment from 'moment'

import { CrudController } from '../crud.controller'
import { regisCourseService, courseStudentService, mailService } from '../../services/index'
import { RegisCourseModel, CourseStudentModel, StudentModel, CourseModel } from '../../models';
import { notifyRegisCourseSuccessEmail } from '../../mailTemplate';


export class RegisCourseController extends CrudController<typeof regisCourseService>{
    constructor() {
        super(regisCourseService);
    }
    async acceptRegis(params: {
        regisCourseId: string
    }) {
        const regisCourse: RegisCourseModel = await this.service.getItem({
            filter: {
                _id: params.regisCourseId
            }, populates: ["student", "course"]
        })
        let startTime = regisCourse.startTime
        let endTime = moment(regisCourse.startTime).add(regisCourse.totalMonth, "months").format()
        let result: any
        const currentCourseStudent = await courseStudentService.model.findOne({
            student: regisCourse.student,
            course: regisCourse.course
        })
        if (currentCourseStudent && moment(currentCourseStudent.endTime).isBefore(moment())) {
            // Truong hop hoc vien dang ky hoc tiep khoa hoc da ket thuc hoac gia han
            result = await currentCourseStudent.update({
                endTime: endTime,
                $inc: { totalMonth: regisCourse.totalMonth }
            }).exec()
        }
        else if (currentCourseStudent && moment(currentCourseStudent.endTime).isAfter(moment())) {
            // Truong hop hoc vien dang ky gia han khoa hoc
            endTime = moment(currentCourseStudent.endTime).add(regisCourse.totalMonth, "months").format()
            result = await currentCourseStudent.update({
                endTime: endTime,
                $inc: { totalMonth: regisCourse.totalMonth }
            }).exec()
        }
        else {
            // Truong hop hoc vien dang ky khoa hoc moi hoan toan
            result = await courseStudentService.create({
                student: regisCourse.student,
                course: regisCourse.course,
                package: regisCourse.package,
                totalMonth: regisCourse.totalMonth,
                startTime: regisCourse.startTime,
                endTime
            })
        }
        // Gui email den hoc vien dang ky khoa hoc thanh cong
        if ((regisCourse.student as StudentModel).email) {
            const mailTemplate = await notifyRegisCourseSuccessEmail.buildTemplate([(regisCourse.student as StudentModel).email], {
                name: `${(regisCourse.student as StudentModel).firstName} ${(regisCourse.student as StudentModel).lastName}`,
                startDay: moment(startTime).format("DD-MM-YYYY"),
                endDay: moment(endTime).format("DD-MM-YYYY"),
                courseName: (regisCourse.course as CourseModel).name
            })
            mailService.sendMail({ mailOption: mailTemplate })
        }
        return result

    }

}