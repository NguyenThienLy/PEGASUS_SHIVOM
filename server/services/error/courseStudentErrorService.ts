
import { BaseError } from './base'

export class CourseStudentException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `customer_exception_${key}`,
            message
        })
    }
}

export class CourseStudentErrorService {
    constructor() {

    }
    haveCancel() {
        return new CourseStudentException("course_student_have_cancel", "Học viên đã huỷ học khoá học này")
    }
    haveLearning() {
        return new CourseStudentException("course_student_have_learning", "Học viên đang học khoá học này")
    }
}