import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { blogController } from '../../controllers'
import { queryInfoMiddleware, authInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class BlogRouter extends CrudRouter<typeof blogController> {
    constructor() {
        super(blogController);
    }
    customRouter() {

    }
    getListMiddlewares(): any[] {
        return [
            blockMiddleware.run()
        ]
    }
    getItemMiddlewares(): any[] {
        return [
            blockMiddleware.run()
        ]
    }
    createMiddlewares(): any[] {
        return [
            blockMiddleware.run()
        ]
    }
    updateMiddlewares(): any[] {
        return [
            blockMiddleware.run()
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

