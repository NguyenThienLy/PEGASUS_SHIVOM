import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { newsController } from '../../controllers'
import { queryInfoMiddleware, authInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class NewsRouter extends CrudRouter<typeof newsController> {
    constructor() {
        super(newsController);
    }
    customRouter() {
        this.router.post("/:_id/slider", this.setNewsAtSliderMiddlewares(), this.route(this.setNewsAtSlider))
        this.router.get("/:_id/client", this.getItemFromClientMiddlewares(), this.route(this.getItemFromClient))
    }
    getItemFromClientMiddlewares(): any[] {
        return [
            queryInfoMiddleware.run()
        ]
    }
    async getItemFromClient(req: Request, res: Response) {
        const result = await this.controller.getItemFromClient(req.queryInfo)
        this.onSuccess(res, result)
    }
    setNewsAtSliderMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async setNewsAtSlider(req: Request, res: Response) {
        await this.validateJSON(req.body, {
            type: "object",
            properties: {
                title: { type: "string" },
                image: { type: "string" },
                description: { type: "string" },
                buttonTitle: { type: "string" }
            },
            required: ["title", "image", "description", "buttonTitle"],
            additionalProperties: false
        })
        req.body.newsId = req.params._id
        const result = await this.controller.setNewsAtSlider(req.body)
        this.onSuccess(res, result)
    }
    getListMiddlewares(): any[] {
        return [
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

