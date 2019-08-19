import { CrudController } from '../crud.controller'
import { timeTableItemService } from '../../services/index'


export class TimeTableItemController extends CrudController<typeof timeTableItemService>{
    constructor(){
        super(timeTableItemService);
    }
    
}