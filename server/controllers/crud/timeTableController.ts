import { CrudController } from '../crudController'
import { timeTableService } from '../../services/index'


export class TimeTableController extends CrudController<typeof timeTableService>{
    constructor(){
        super(timeTableService);
    }
    
}