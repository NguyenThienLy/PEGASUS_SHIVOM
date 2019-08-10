import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { sliderController } from '../../controllers'
import { } from '../../middlewares'

export default class SliderRouter extends CrudRouter<typeof sliderController> {
    constructor() {
        super(sliderController);
    }
    customRouter() {
        
    }

}

