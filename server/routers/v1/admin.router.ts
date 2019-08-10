import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { adminController } from '../../controllers'
import { } from '../../middlewares'

export default class AdminRouter extends CrudRouter<typeof adminController> {
    constructor() {
        super(adminController);
    }
    customRouter() {
        this.router.post("/login", [], this.route(this.login))
    }
    async login(req: Request, res: Response){
        const result = await this.controller.login(req.body)
        this.onSuccess(res, result)
    }

}

