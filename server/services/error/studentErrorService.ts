import { BaseError } from './base'

export class StudentException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `student_exception_${key}`,
            message
        })
    }
}

export class StudentErrorService {
    constructor() {

    }
    courseHaventApplied() {
        return new StudentException('course_havent_applied', 'Bạn chưa đăng ký khoá học này')
    }
    courseHaveApplied() {
        return new StudentException('course_have_applied', 'Bạn đã đăng ký khoá học này, nếu cần gia hạn hãy gia hạn thời gian học của khoá học này')
    }
}