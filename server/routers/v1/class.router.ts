import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { classController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class ClassRouter extends CrudRouter<typeof classController> {
    constructor() {
        super(classController);
    }
    customRouter() {
        this.router.get("/:_id/timeTable", this.getTimeTableMiddlewares(), this.route(this.getTimeTable))
        this.router.post("/:_id/timeTable", this.addTimeTableItemForClassMiddlewares(), this.route(this.addTimeTableItemForClass))
        this.router.delete("/:_id/timeTable/:timeTableItemId", this.deleteTimeTableItemForClassMiddlewares(), this.route(this.deleteTimeTableItemForClass))
        this.router.put("/:_id/status", this.changeClassStatusMiddlewares(), this.route(this.changeClassStatus))
    }
    changeClassStatusMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async changeClassStatus(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                status: { type: "string", enum: ["active", "deactive"] }
            },
            required: ["status"],
            additionalProperties: false
        })
        req.body.classId = req.params._id
        const result = await this.controller.changeClassStatus(req.body)
        this.onSuccess(res, result)
    }
    getTimeTableMiddlewares(): any[] {
        return [
            queryInfoMiddleware.run()
        ]
    }
    async getTimeTable(req: Request, res: Response) {
        const result = await this.controller.getTimeTable({
            classId: req.params._id
        }, req.queryInfo)
        this.onSuccess(res, result)
    }
    deleteTimeTableItemForClassMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async deleteTimeTableItemForClass(req: Request, res: Response) {

        const result = await this.controller.deleteTimeTableItem({
            classId: req.params._id,
            timeTableItemId: req.params.timeTableItemId
        })
        this.onSuccess(res, result)
    }
    addTimeTableItemForClassMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async addTimeTableItemForClass(req: Request, res: Response) {
        const timeSchema = {
            type: "object",
            properties: {
                hour: { type: "number", min: 0, max: 23 },
                minute: { type: "number", min: 0, max: 59 }
            },
            required: ["hour", "minute"]
        }
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                startTime: timeSchema,
                endTime: timeSchema,
                startAvailableCheckinTime: timeSchema,
                endAvailableCheckinTime: timeSchema,
                dayOfWeek: {
                    type: "string", enum: ["monday", "tuesday", "webnesday", "thursday", "friday", "saturday", "sunday"]
                },
                room: { type: "string" }
            },
            required: ["startTime", "endTime", "startAvailableCheckinTime", "dayOfWeek", "room"]
        })
        const result = await this.controller.addTimeTableItem({
            classId: req.params._id,
            timeTableItem: req.body
        })
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

