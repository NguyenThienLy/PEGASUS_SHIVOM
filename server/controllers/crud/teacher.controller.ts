import { CrudController } from '../crud.controller'
import { teacherService } from '../../services/index'


export class TeacherController extends CrudController<typeof teacherService>{
    constructor(){
        super(teacherService);
    }
    
}