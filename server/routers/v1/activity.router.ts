import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { activityController } from '../../controllers'
import { } from '../../middlewares'

export default class ActivityRouter extends CrudRouter<typeof activityController> {
    constructor() {
        super(activityController);
    }
    customRouter() {
        
    }

}

