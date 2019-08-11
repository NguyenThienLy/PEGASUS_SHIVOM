import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { packageController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware } from '../../middlewares'

export default class PackageRouter extends CrudRouter<typeof packageController> {
    constructor() {
        super(packageController);
    }
    customRouter() {

    }
    getListMiddlewares(): any[] {
        return [authInfoMiddleware.run(["admin","student"]), queryInfoMiddleware.run()]
    }

}

