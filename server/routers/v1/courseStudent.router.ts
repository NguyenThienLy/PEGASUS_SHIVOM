import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { courseStudentController } from '../../controllers'
import { queryInfoMiddleware, authInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class CourseStudentRouter extends CrudRouter<typeof courseStudentController> {
    constructor() {
        super(courseStudentController);
    }
    customRouter() {
        this.router.post("/:_id/extend", this.extendMiddlewares(), this.route(this.extend))
        this.router.post("/:_id/cancel", this.cancelMiddlewares(), this.route(this.cancel))
        this.router.post("/:_id/relearn", this.relearnMiddlewares(), this.route(this.relearn))
    }
    relearnMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async relearn(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                isPayFee: { type: "boolean" },
                type: { type: "string", enum: ["package", "monthAmount"] },
                package: { type: "string" },
                monthAmount: { type: "number" },
                startTime: { type: "string", format: "date-time" }
            },
            required: ["isPayFee", "type"],
            additionalProperties: false
        })
        req.body.courseStudentId = req.params._id
        const result = await this.controller.relearn(req.body)
        this.onSuccess(res, result)
    }
    cancelMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async cancel(req: Request, res: Response) {
        req.body.courseStudentId = req.params._id
        const result = await this.controller.cancel(req.body)
        this.onSuccess(res, result)
    }
    extendMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async extend(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                isPayFee: { type: "boolean" },
                type: { type: "string", enum: ["package", "monthAmount"] },
                package: { type: "string" },
                monthAmount: { type: "number" }
            },
            required: ["isPayFee", "type"],
            additionalProperties: false
        })
        req.body.courseStudentId = req.params._id
        const result = await this.controller.extend(req.body)
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
            blockMiddleware.run()
        ]
    }
    deleteAllMiddlewares(): any[] {
        return [
            blockMiddleware.run()
        ]
    }
}

