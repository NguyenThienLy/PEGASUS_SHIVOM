import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { courseController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class CourseRouter extends CrudRouter<typeof courseController> {
    constructor() {
        super(courseController);
    }
    customRouter() {
        this.router.get("/:_id/timeTable", this.getTimeTableOfCourseMiddlewares(), this.route(this.getTimeTableOfCourse))
        this.router.get("/timeTable", this.getAllTimeTableMiddlewares(), this.route(this.getAllTimeTable))
        this.router.get("/:_id/teacher", this.getTeachersOfCourseMiddlewares(), this.route(this.getTeachersOfCourse))
    }
    getTeachersOfCourseMiddlewares(): any[] {
        return [
            queryInfoMiddleware.run()
        ]
    }
    async getTeachersOfCourse(req: Request, res: Response) {
        const result = await this.controller.getTeachersOfCourse(req.params._id, req.queryInfo)
        this.onSuccess(res, result)
    }
    getAllTimeTableMiddlewares(): any[] {
        return [
            queryInfoMiddleware.run()
        ]
    }
    async getAllTimeTable(req: Request, res: Response) {
        const result = await this.controller.getAllTimeTable(req.queryInfo)
        this.onSuccessAsList(res, result)
    }
    getTimeTableOfCourseMiddlewares(): any[] {
        return [
            queryInfoMiddleware.run()
        ]
    }
    async getTimeTableOfCourse(req: Request, res: Response) {
        const result = await this.controller.getTimeTableOfCourse({
            courseId: req.params._id
        }, req.queryInfo)
        this.onSuccess(res, result)
    }
    getListMiddlewares(): any[] {
        return [
            queryInfoMiddleware.run()
        ]
    }
    getItemMiddlewares(): any[] {
        return [
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

