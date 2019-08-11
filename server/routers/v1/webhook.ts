import * as express from 'express';
import * as _ from 'lodash';
import { BaseRouter, Request, Response } from '../base';
import { CrudController, webhookController } from '../../controllers/index'
import { queryInfoMiddleware, checkinMiddleware } from '../../middlewares'
import { tokenService } from '../../services';

export default class WebhookRouter extends BaseRouter {
    router: express.Router;
    constructor() {
        super();

        this.router = express.Router();
        this.customRouter();
    }
    customRouter() {
        this.router.get("/checkin", this.checkInWebhookMiddlewares(), this.route(this.checkin))
        this.router.get("/test", this.route(this.test))
    }
    async test(req: Request, res: Response) {
        const token = await tokenService.getCheckinToken(req.query)
        this.onSuccess(res, token)
    }
    checkInWebhookMiddlewares(): any[] {
        return [
            checkinMiddleware.run()
        ]
    }
    async checkin(req: Request, res: Response) {
        webhookController.onCheckInEvent(req.checkInPayload)
        this.onSuccess(res)
    }

}