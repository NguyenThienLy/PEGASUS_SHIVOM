import { CrudController } from '../crud.controller'
import { courseService } from '../../services/index'


export class CourseController extends CrudController<typeof courseService>{
    constructor(){
        super(courseService);
    }
    
}