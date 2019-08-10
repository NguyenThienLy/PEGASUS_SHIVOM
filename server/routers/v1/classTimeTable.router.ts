import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { classTimeTableController } from '../../controllers'
import { } from '../../middlewares'

export default class ClassTimeTableRouter extends CrudRouter<typeof classTimeTableController> {
    constructor() {
        super(classTimeTableController);
    }
    customRouter() {
        
    }

}

