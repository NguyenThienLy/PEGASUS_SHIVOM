import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { statisticClassController } from '../../controllers'
import { } from '../../middlewares'

export default class StatisticClassRouter extends CrudRouter<typeof statisticClassController> {
    constructor() {
        super(statisticClassController);
    }
    customRouter() {
        
    }

}

