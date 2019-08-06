import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { courseController } from '../../controllers'
import { } from '../../middlewares'

export default class CourseRouter extends CrudRouter<typeof courseController> {
    constructor() {
        super(courseController);
    }
    customRouter() {
        
    }

}

