import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { statisticStudentController } from '../../controllers'
import { } from '../../middlewares'

export default class StatisticStudentRouter extends CrudRouter<typeof statisticStudentController> {
    constructor() {
        super(statisticStudentController);
    }
    customRouter() {
        
    }

}

