import { CrudController } from '../crud.controller'
import { courseStudentService } from '../../services/index'


export class CourseStudentController extends CrudController<typeof courseStudentService>{
    constructor(){
        super(courseStudentService);
    }
    
}