import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { checkinController } from '../../controllers'
import { } from '../../middlewares'

export default class CheckinRouter extends CrudRouter<typeof checkinController> {
    constructor() {
        super(checkinController);
    }
    customRouter() {
        
    }

}

