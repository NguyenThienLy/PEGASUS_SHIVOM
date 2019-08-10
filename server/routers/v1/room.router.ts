import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { roomController } from '../../controllers'
import { } from '../../middlewares'

export default class RoomRouter extends CrudRouter<typeof roomController> {
    constructor() {
        super(roomController);
    }
    customRouter() {
        
    }

}

