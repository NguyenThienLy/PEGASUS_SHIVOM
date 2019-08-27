import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { settingController } from '../../controllers'
import { } from '../../middlewares'

export default class SettingRouter extends CrudRouter<typeof settingController> {
    constructor() {
        super(settingController);
    }
    customRouter() {
        
    }

}

