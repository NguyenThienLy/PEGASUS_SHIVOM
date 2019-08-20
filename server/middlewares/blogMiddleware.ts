import * as express from 'express'
import { Request, Response } from '../routers/base'
import { errorService, tokenService, blogService } from '../services'
import { BaseMiddleware } from './baseMiddleware'
import { Blog, BlogModel } from '../models/index.model'

export class BookingInfoMiddleware extends BaseMiddleware {

    async use(req: Request, res: Response, next: express.NextFunction, providers: string[]){
        const _id = req.params._id
        try{
            req.blogInfo = await blogService.getItem({filter: { _id}})
           
            next()
        } catch(error){
            throw errorService.database.queryFail()
        }
    }
}