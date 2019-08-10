import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { rankController } from '../../controllers'
import { } from '../../middlewares'

export default class RankRouter extends CrudRouter<typeof rankController> {
    constructor() {
        super(rankController);
    }
    customRouter() {
        
    }

}

