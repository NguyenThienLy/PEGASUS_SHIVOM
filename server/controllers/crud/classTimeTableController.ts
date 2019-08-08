import { CrudController } from '../crudController'
import { classTimeTableService } from '../../services/index'


export class ClassTimeTableController extends CrudController<typeof classTimeTableService>{
    constructor(){
        super(classTimeTableService);
    }
    
}