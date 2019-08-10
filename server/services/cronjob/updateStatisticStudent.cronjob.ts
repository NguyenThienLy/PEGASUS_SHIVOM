import { classService, studentService, checkinService } from '../index'

export class UpdateStatisticStudentCronJob {
    constructor() {
    }

    static instance: UpdateStatisticStudentCronJob
    static getInstance(): UpdateStatisticStudentCronJob {
        if (!this.instance) {
            this.instance = new UpdateStatisticStudentCronJob()
        }
        return this.instance
    }

    // Hàm ghi nhận dữ liệu để thông kê cho học viên
    async updateStatisticStudent() {
        
    }
}