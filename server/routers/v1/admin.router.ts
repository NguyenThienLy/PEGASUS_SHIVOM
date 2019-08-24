import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { adminController } from '../../controllers'
import { queryInfoMiddleware, blockMiddleware, authInfoMiddleware } from '../../middlewares'
import { UpdateStatisticCronJob } from '../../services/cronjob/updateStatistic.cronjob.service';

export default class AdminRouter extends CrudRouter<typeof adminController> {
    constructor() {
        super(adminController);
    }
    customRouter() {
        this.router.post("/login", [], this.route(this.login))

    }
    async login(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                username: { type: "string" },
                password: { type: "string" }
            },
            required: ["username", "password"],
            additionalProperties: false
        })
        const result = await this.controller.login(req.body)
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
            authInfoMiddleware.run(["admin"]),
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
            authInfoMiddleware.run(["admin"])
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

