import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { promotionController } from '../../controllers'
import { queryInfoMiddleware, authInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class PromotionRouter extends CrudRouter<typeof promotionController> {
    constructor() {
        super(promotionController);
    }
    customRouter() {

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

