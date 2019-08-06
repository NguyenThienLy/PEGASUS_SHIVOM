import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { newsController } from '../../controllers'
import { } from '../../middlewares'

export default class NewsRouter extends CrudRouter<typeof newsController> {
    constructor() {
        super(newsController);
    }
    customRouter() {
        
    }

}

