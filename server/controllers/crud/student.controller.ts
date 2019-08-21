import * as _ from 'lodash'

import { CrudController } from '../crud.controller'
import { studentService, ICrudOption, courseStudentService, classTimeTableService, errorService } from '../../services/index'
import { CourseStudentModel } from '../../models';


export class StudentController extends CrudController<typeof studentService>{
    constructor() {
        super(studentService);
    }
    async getTimeTableOfStudentByCourse(params: {
        courseId: string
        studentId: string
    }, option: ICrudOption) {
        const { courseId, studentId } = params
        const coursesOfStudent = await courseStudentService.model.findOne({
            student: studentId,
            course: courseId
        })
        if (!coursesOfStudent) {
            throw errorService.student.courseHaventApplied()
        }
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
        const coursesOfStudent = await courseStudentService.model.find({
            student: studentId
        })
        const { rows: classTimeTables } = await classTimeTableService.getList(_.merge({
            filter: {
                course: coursesOfStudent.map((coursesOfStudent: CourseStudentModel) => { return coursesOfStudent.course })
            },
            populates: ["items", { path: "class", populate: ["teacher"] }]
        }, option))
        return classTimeTables
    }

}