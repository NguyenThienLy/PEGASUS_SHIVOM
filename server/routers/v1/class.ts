import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { classController } from '../../controllers'
import { } from '../../middlewares'

export default class ClassRouter extends CrudRouter<typeof classController> {
    constructor() {
        super(classController);
    }
    customRouter() {
        
    }

}

