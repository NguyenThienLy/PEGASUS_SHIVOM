import { CrudController } from '../crudController'
import { studentService } from '../../services/index'


export class StudentController extends CrudController<typeof studentService>{
    constructor(){
        super(studentService);
    }
    
}