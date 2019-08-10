import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { studentTimeTableController } from '../../controllers'
import { } from '../../middlewares'

export default class StudentTimeTableRouter extends CrudRouter<typeof studentTimeTableController> {
    constructor() {
        super(studentTimeTableController);
    }
    customRouter() {
        
    }

}

