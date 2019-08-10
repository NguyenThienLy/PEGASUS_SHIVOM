import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { teacherController } from '../../controllers'
import { } from '../../middlewares'

export default class TeacherRouter extends CrudRouter<typeof teacherController> {
    constructor() {
        super(teacherController);
    }
    customRouter() {
        
    }

}

