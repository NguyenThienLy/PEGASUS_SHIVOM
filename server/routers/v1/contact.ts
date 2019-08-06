import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { contactController } from '../../controllers'
import { } from '../../middlewares'

export default class ContactRouter extends CrudRouter<typeof contactController> {
    constructor() {
        super(contactController);
    }
    customRouter() {
        
    }

}

