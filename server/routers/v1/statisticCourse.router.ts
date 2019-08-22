import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { statisticCourseController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class StatisticClassRouter extends CrudRouter<typeof statisticCourseController> {
    constructor() {
        super(statisticCourseController);
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

