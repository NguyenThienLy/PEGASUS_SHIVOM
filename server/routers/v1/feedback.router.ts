import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { feedbackController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class FeedbackRouter extends CrudRouter<typeof feedbackController> {
    constructor() {
        super(feedbackController);
    }
    customRouter() {
        this.router.post("/:_id/reply", this.replyFeedbackMiddlewares(), this.route(this.replyFeedback))
        this.router.put("/:_id/updateConfirmFeedbacks", this.updateConfirmFeedbackMiddlewares(), this.route(this.updateConfirmFeedback))
    }

    replyFeedbackMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }

    async replyFeedback(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                content: { type: "string" }
            },
            required: ["content"],
            additionalProperties: false
        })
        const result = await this.controller.replyFeedback(req.params._id, req.body)
        this.onSuccess(res, result)
    }

    updateConfirmFeedbackMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }

    async updateConfirmFeedback(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                studentId: { type: "string" },
                isReply: { type: "boolean" },
                content: { type: "string" },
                point: { type: "number" }
            },
            additionalProperties: false
        })
        const result = await this.controller.updateConfirmFeedback(req.params._id, req.body)
        this.onSuccess(res, result)
    }

    getListMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin", "student"]),
            queryInfoMiddleware.run()
        ]
    }

    getItemMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }

    createMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["student"])
        ]
    }

    updateMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin", "student"]),
            queryInfoMiddleware.run()
        ]
    }

    deleteMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["student"]),
            queryInfoMiddleware.run()
        ]
    }
    deleteAllMiddlewares(): any[] {
        return [
            blockMiddleware.run()
        ]
    }

}

