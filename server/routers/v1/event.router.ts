import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { eventController } from '../../controllers'
import { queryInfoMiddleware, authInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class EventRouter extends CrudRouter<typeof eventController> {
    constructor() {
        super(eventController);
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

