import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { newCategoryController } from '../../controllers'
import { } from '../../middlewares'

export default class NewCategoryRouter extends CrudRouter<typeof newCategoryController> {
    constructor() {
        super(newCategoryController);
    }
    customRouter() {
        
    }

}

