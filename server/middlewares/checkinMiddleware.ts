import * as express from 'express'
import { Request, Response } from '../routers/base'
import { errorService, tokenService, adminService, studentService } from '../services'
import { BaseMiddleware } from './baseMiddleware'
import { config } from '../config';
import { AdminModel, StudentModel } from '../models';

export class CheckInMiddleware extends BaseMiddleware {

    async use(req: Request, res: Response, next: express.NextFunction, providers: string[]) {
        try {
            const token = req.headers["x-token"]
            const payload = await tokenService.decode(token, config.token.checkinSecret)
            req.checkInPayload = {
                cardId: payload.cardId,
                timestamps: payload.timestamps
            }
            next()
        } catch (err) {
            throw errorService.auth.permissionDenied()
        }
    }
}