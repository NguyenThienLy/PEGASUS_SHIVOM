import { CrudController } from '../crud.controller'
import { studentService } from '../../services/index'


export class StudentController extends CrudController<typeof studentService>{
    constructor(){
        super(studentService);
    }
    
}