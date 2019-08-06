import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { timeTableItemController } from '../../controllers'
import { } from '../../middlewares'

export default class TimeTableItemRouter extends CrudRouter<typeof timeTableItemController> {
    constructor() {
        super(timeTableItemController);
    }
    customRouter() {
        
    }

}

