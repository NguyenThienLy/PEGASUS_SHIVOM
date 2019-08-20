import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { classTimeTableController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class ClassTimeTableRouter extends CrudRouter<typeof classTimeTableController> {
    constructor() {
        super(classTimeTableController);
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

