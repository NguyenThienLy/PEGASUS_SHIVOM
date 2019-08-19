import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { skillController } from '../../controllers'
import { } from '../../middlewares'

export default class SkillRouter extends CrudRouter<typeof skillController> {
    constructor() {
        super(skillController);
    }
    customRouter() {
        
    }

}

