import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { tesmonialController } from '../../controllers'
import { queryInfoMiddleware, authInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class TesmonialRouter extends CrudRouter<typeof tesmonialController> {
    constructor() {
        super(tesmonialController);
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
            authInfoMiddleware.run(["admin"])
        ]
    }
    deleteMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    deleteAllMiddlewares(): any[] {
        return [
            blockMiddleware.run()
        ]
    }
}

