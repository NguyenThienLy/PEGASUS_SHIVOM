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

