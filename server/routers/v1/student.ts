import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { studentController } from '../../controllers'
import { } from '../../middlewares'

export default class StudentRouter extends CrudRouter<typeof studentController> {
    constructor() {
        super(studentController);
    }
    customRouter() {
        
    }

}

                                                             