import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { newCategoryController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class NewCategoryRouter extends CrudRouter<typeof newCategoryController> {
    constructor() {
        super(newCategoryController);
    }
    customRouter() {
        this.router.get("/countNews", this.countNewsMiddlewares(), this.route(this.countNews))
        this.router.get("/:_id/countNews", this.countNewsOfCategoryMiddlewares(), this.route(this.countNewsOfCategory))
    }
    countNewsOfCategoryMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async countNewsOfCategory(req: Request, res: Response) {
        const result = await this.controller.countNewsOfCategory({
            categoryId: req.params._id
        })
        this.onSuccess(res, result)
    }
    countNewsMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async countNews(req: Request, res: Response) {
        const result = await this.controller.countNews()
        this.onSuccess(res, result)
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

