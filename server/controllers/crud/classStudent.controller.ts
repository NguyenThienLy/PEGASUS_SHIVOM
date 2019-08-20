import { CrudController } from '../crud.controller'
import { classStudentService } from '../../services/index'


export class ClassStudentController extends CrudController<typeof classStudentService>{
    constructor(){
        super(classStudentService);
    }
    
}