import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { checkinController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class CheckinRouter extends CrudRouter<typeof checkinController> {
    constructor() {
        super(checkinController);
    }
    customRouter() {

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
            // authInfoMiddleware.run(["admin"])
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

