import { CrudController } from '../crud.controller'
import { eventService } from '../../services/index'


export class EventController extends CrudController<typeof eventService>{
    constructor(){
        super(eventService);
    }
    
}