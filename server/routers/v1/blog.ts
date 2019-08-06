import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { blogController } from '../../controllers'
import { } from '../../middlewares'

export default class BlogRouter extends CrudRouter<typeof blogController> {
    constructor() {
        super(blogController);
    }
    customRouter() {
        this.router.get('/test', [], this.route(this.test))
    }
    async test(req: Request, res: Response) {
        this.onSuccess(res, "XIn chào")
    }

}

