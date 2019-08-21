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
        this.router.get("/test", this.route(this.test))

        this.router.post("/login", [], this.route(this.login))
        
    }
    async test(req: Request, res: Response){
        const result = await UpdateStatisticCronJob.getInstance().updateStatistic()
        this.onSuccess(res, result)
    }
    async login(req: Request, res: Response) {
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

