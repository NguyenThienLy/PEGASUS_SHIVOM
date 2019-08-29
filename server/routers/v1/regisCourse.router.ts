import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { regisCourseController } from '../../controllers'
import { authInfoMiddleware } from '../../middlewares'

export default class RegisCourseRouter extends CrudRouter<typeof regisCourseController> {
    constructor() {
        super(regisCourseController);
    }
    customRouter() {
        this.router.post("/:_id/enroll", this.enrollToCourseMiddlewares(), this.route(this.enrollToCourse))
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
                student: { type: "string" },
                package: { type: "string" },
                totalMonth: { type: "number", min: 0, max: 0 },
                startTime: { type: "string", format: "date-time" },

            },
            required: ["student", "totalMonth", "startTime"],
            additionalProperties: false
        })
        req.body.regisCourseId = req.params._id
        const result = await this.controller.enrollToCourse(req.body)
        this.onSuccess(res, result)
    }

}

