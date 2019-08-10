import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { blogController } from '../../controllers'
import { queryInfoMiddleware, authInfoMiddleware } from '../../middlewares'

export default class BlogRouter extends CrudRouter<typeof blogController> {
    constructor() {
        super(blogController);
    }
    customRouter() {

    }
    getListMiddlewares(): any[] {
        return [authInfoMiddleware.run(["admin"]), queryInfoMiddleware.run()]
    }

}

