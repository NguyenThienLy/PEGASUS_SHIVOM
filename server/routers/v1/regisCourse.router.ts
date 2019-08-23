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
        this.router.post("/:_id/accept", this.acceptRegisMiddlewares(), this.route(this.acceptRegis))
    }
    acceptRegisMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async acceptRegis(req: Request, res: Response) {
        const result = await this.controller.acceptRegis({
            regisCourseId: req.params._id
        })
        this.onSuccess(res, result)
    }

}

