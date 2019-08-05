import * as express from 'express'
import { Request, Response } from '../routers/base'
import {  errorService, tokenService } from '../services'
import { BaseMiddleware } from './baseMiddleware'

export class BlockMiddleware extends BaseMiddleware {

    async use(req: Request, res: Response, next: express.NextFunction, providers: string[]){
        throw errorService.auth.permissionDenied()
    }
}