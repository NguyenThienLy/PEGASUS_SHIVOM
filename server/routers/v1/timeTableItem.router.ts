import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { timeTableItemController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class TimeTableItemRouter extends CrudRouter<typeof timeTableItemController> {
    constructor() {
        super(timeTableItemController);
    }
    customRouter() {
        
    }
    getListMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin","student"]),
            queryInfoMiddleware.run()
        ]
    }
    getItemMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin", "student"]),
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
            // authInfoMiddleware.run(["admin"]),
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

