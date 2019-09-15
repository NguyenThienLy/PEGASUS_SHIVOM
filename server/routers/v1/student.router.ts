import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { studentController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'
import { StudentCronjobService } from '../../services/cronjob/student.cronjob.service';

export default class StudentRouter extends CrudRouter<typeof studentController> {
    constructor() {
        super(studentController);
    }
    customRouter() {
        this.router.get("/:_id/timeTable", this.getTimeTableOfStudentMiddlewares(), this.route(this.getTimeTableOfStudent))
        this.router.get("/:_id/timeTable/:courseId", this.getTimeTableOfStudentByCourseMiddlewares(), this.route(this.getTimeTableOfStudentByCourse))
        this.router.get("/:_id/class", this.getListClassOfStudentMiddlewares(), this.route(this.getListClassOfStudent))
        this.router.get("/upcommingBirthday", this.getListStudentUpcommingBirthdayMiddlewares(), this.route(this.getListStudentUpcommingBirthday))
        this.router.get("/:_id/checkin", this.checkinMiddlewares(), this.route(this.checkin))
        this.router.get("/search", this.searchMiddlewares(), this.route(this.search))
        this.router.get("/upcommingExpired", this.getListStudentUpcommingExpiredMiddlewares(), this.route(this.getListStudentUpcommingExpired))
        this.router.get("/statisticForColumnChart", this.statisticForColumnChartMiddlewares(), this.route(this.statisticForColumnChart))
        this.router.post("/sendMailUpcommingExpired", this.sendMailUpcommingExpiredMiddlewares(), this.route(this.sendMailUpcommingExpired))
        this.router.post("/login", [], this.route(this.login))
        this.router.post("/:_id/card", this.updateCardMiddlewares(), this.route(this.updateCard))
        this.router.post("/:_id/sendGift", this.sendGiftMiddlewares(), this.route(this.sendGift))
        this.router.post("/:_id/enroll", this.enrollToCourseMiddlewares(), this.route(this.enrollToCourse))
        this.router.post("/enroll", this.enrollMiddlewares(), this.route(this.enroll))
    }

    enrollMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async enroll(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                personalInfo: {
                    type: "object",
                    properties: {
                        cardId: { type: "string" },
                        phone: { type: "string" },
                        point: { type: "number" },
                        firstName: { type: "string" },
                        lastName: { type: "string" },
                        birthday: { type: "string", format: "date-time" },
                        address: { type: "string" },
                        avatar: { type: "string" }
                    }
                },
                courses: {
                    type: "array",
                    items: {
                        properties: {
                            _id: { type: "string" },
                            monthAmount: { type: "number" },
                            timeTableIds: { type: "array", items: { type: "string" } }
                        }
                    }
                },
                isPayFee: { type: "boolean" }
            },
            required: ["personalInfo", "courses"],
            additionalProperties: false
        })
        const result = await this.controller.enroll(req.body)
        this.onSuccess(res, result)
    }
    enrollToCourseMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async enrollToCourse(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                courseId: { type: "string" },
                isPayFee: { type: "boolean" },
                startTime: { type: "string", format: "date-time" },
                endTime: { type: "string", format: "date-time" }
            },
            required: ["courseId", "isPayFee", "startTime", "endTime"],
            additionalProperties: false
        })
        req.body.studentId = req.params._id
        const result = await this.controller.enrollToCourse(req.body)
        this.onSuccess(res, result)
    }
    sendGiftMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async sendGift(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                gift: { type: "string" },
                amount: { type: "number" }
            },
            required: ["gift", "amount"],
            additionalProperties: false
        })
        req.body.studentId = req.params._id
        const result = await this.controller.sendGift(req.body)
        this.onSuccess(res, result)
    }
    updateCardMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async updateCard(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                code: { type: "string" }
            },
            required: ["code"],
            additionalProperties: false
        })
        req.body.studentId = req.params._id
        const result = await this.controller.updateCard(req.body)
        this.onSuccess(res, result)
    }
    async login(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                phone: { type: "string" },
                password: { type: "string" }
            },
            required: ["phone", "password"],
            additionalProperties: false
        })
        const result = await this.controller.login(req.body)
        this.onSuccess(res, result)
    }
    sendMailUpcommingExpiredMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async sendMailUpcommingExpired(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                courseStudentIds: { type: "array", items: { type: "string" } }
            },
            required: ["courseStudentIds"],
            additionalProperties: false
        })
        const result = await this.controller.sendMailUpcommingExpired(req.body)
        this.onSuccess(res, result)
    }
    getListStudentUpcommingExpiredMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }
    async getListStudentUpcommingExpired(req: Request, res: Response) {
        await this.validateJSON(req.query, {
            type: "object",
            properties: {
                startTime: { type: "string", format: "date-time" },
                endTime: { type: "string", format: "date-time" }
            },
            additionalProperties: false
        })
        const result = await this.controller.getListStudentUpcommingExpired(req.query, req.queryInfo)
        this.onSuccessAsList(res, result, null, req.queryInfo)
    }
    statisticForColumnChartMiddlewares(): any[] {
        return [
            // authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }    // Lấy dữ liệu thông kê sĩ số học sinh theo tháng
    async statisticForColumnChart(req: Request, res: Response) {
        await this.validateJSON(req.query, {
            type: "object",
            properties: {
                course: { type: "string" },
                startTime: { type: "string", format: "date-time" },
                endTime: { type: "string", format: "date-time" }
            },
            additionalProperties: false
        })
        const result = await this.controller.statisticForColumnChart(req.query)
        this.onSuccess(res, result)
    }
    searchMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }
    async search(req: Request, res: Response) {
        await this.validateJSON(req.query, {
            type: "object",
            properties: {
                phone: { type: "string" }
            },
            required: ["phone"],
            additionalProperties: true
        })
        const result = await this.controller.search(req.query, req.queryInfo)
        this.onSuccessAsList(res, result, null, req.queryInfo)
    }
    checkinMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async checkin(req: Request, res: Response) {
        const result = await this.controller.checkin({
            studentId: req.params._id
        })
        this.onSuccess(res, result)
    }
    getListStudentUpcommingBirthdayMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }
    async getListStudentUpcommingBirthday(req: Request, res: Response) {
        await this.validateJSON(req.query, {
            type: "object",
            properties: {
                startTime: { type: "string", format: "date-time" },
                endTime: { type: "string", format: "date-time" }
            },
            additionalProperties: false
        })
        const result = await this.controller.getListStudentUpcommingBirthday(req.query, req.queryInfo)
        this.onSuccessAsList(res, result, null, req.queryInfo)
    }
    getListClassOfStudentMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin", "student"]),
            queryInfoMiddleware.run()
        ]
    }
    async getListClassOfStudent(req: Request, res: Response) {
        const result = await this.controller.getListClassOfStudent({
            studentId: req.params._id
        }, req.queryInfo)
        this.onSuccess(res, result)
    }
    getTimeTableOfStudentByCourseMiddlewares(): any[] {
        return [
            queryInfoMiddleware.run()
        ]
    }
    async getTimeTableOfStudentByCourse(req: Request, res: Response) {
        const result = await this.controller.getTimeTableOfStudentByCourse({
            studentId: req.params._id,
            courseId: req.params.courseId
        }, req.queryInfo)
        this.onSuccess(res, result)
    }
    getTimeTableOfStudentMiddlewares(): any[] {
        return [
            queryInfoMiddleware.run()
        ]
    }
    async getTimeTableOfStudent(req: Request, res: Response) {
        const result = await this.controller.getTimeTableOfStudent({
            studentId: req.params._id
        }, req.queryInfo)
        this.onSuccess(res, result)
    }
    getListMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }
    getItemMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin", "student"]),
            queryInfoMiddleware.run()
        ]
    }
    createMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    updateMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }
    deleteMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }
    deleteAllMiddlewares(): any[] {
        return [
            blockMiddleware.run()
        ]
    }
}

