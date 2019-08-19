import { CrudController } from '../crud.controller'
import { studentTimeTableService } from '../../services/index'


export class StudentTimeTableController extends CrudController<typeof studentTimeTableService>{
    constructor(){
        super(studentTimeTableService);
    }
    
}