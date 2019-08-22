import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { regisCourseController } from '../../controllers'
import { } from '../../middlewares'

export default class RegisCourseRouter extends CrudRouter<typeof regisCourseController> {
    constructor() {
        super(regisCourseController);
    }
    customRouter() {
        
    }

}

