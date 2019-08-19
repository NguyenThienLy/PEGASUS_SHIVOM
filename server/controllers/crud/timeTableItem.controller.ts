import { CrudController } from '../crudController'
import { timeTableItemService } from '../../services/index'


export class TimeTableItemController extends CrudController<typeof timeTableItemService>{
    constructor(){
        super(timeTableItemService);
    }
    
}