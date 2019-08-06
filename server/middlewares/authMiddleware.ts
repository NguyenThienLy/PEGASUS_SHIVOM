import * as express from 'express'
import { Request, Response } from '../routers/base'
import {  errorService, tokenService } from '../services'
import { BaseMiddleware } from './baseMiddleware'

export class AuthInfoMiddleware extends BaseMiddleware {

    async use(req: Request, res: Response, next: express.NextFunction, providers: string[]){
        try{
            req.authInfo = {
                companyId: req.headers["company_id"],
                companyToken: req.headers["company_token"]
            }
          
            next()
        } catch(err){
            throw errorService.auth.unauthonized()
        }
    }
}