import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { {name}Controller } from '../../controllers'
import { } from '../../middlewares'

export default class {Name}Router extends CrudRouter<typeof {name}Controller> {
    constructor() {
        super({name}Controller);
    }
    customRouter() {
        
    }

}

