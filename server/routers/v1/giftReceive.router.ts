import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { giftReceiveController } from '../../controllers'
import { queryInfoMiddleware, authInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class GiftReceiveRouter extends CrudRouter<typeof giftReceiveController> {
    constructor() {
        super(giftReceiveController);
    }
    customRouter() {
        this.router.post("/:_id/receive", this.receiveGiftMiddlewares(), this.route(this.receiveGift))
    }
    receiveGiftMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }
    async receiveGift(req: Request, res: Response) {
        const result = await this.controller.receiveGift({
            giftReceiveId: req.params._id
        })
        this.onSuccess(res, result)
    }
    getListMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin", "student"]),
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

