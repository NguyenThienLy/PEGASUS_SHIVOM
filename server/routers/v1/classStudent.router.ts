import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { classStudentController } from '../../controllers'
import { } from '../../middlewares'

export default class ClassStudentRouter extends CrudRouter<typeof classStudentController> {
    constructor() {
        super(classStudentController);
    }
    customRouter() {
        
    }

}

