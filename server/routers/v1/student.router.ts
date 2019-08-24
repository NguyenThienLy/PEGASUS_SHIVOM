import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { studentController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

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
        this.router.post("/sendMailUpcommingExpired", this.sendMailUpcommingExpiredMiddlewares(), this.route(this.sendMailUpcommingExpired))
        this.router.post("/login", [], this.route(this.login))

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

