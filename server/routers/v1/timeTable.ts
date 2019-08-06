import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { timeTableController } from '../../controllers'
import { } from '../../middlewares'

export default class TimeTableRouter extends CrudRouter<typeof timeTableController> {
    constructor() {
        super(timeTableController);
    }
    customRouter() {
        
    }

}

