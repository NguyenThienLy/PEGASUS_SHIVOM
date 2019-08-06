import { CrudController } from '../crudController'
import { teacherService } from '../../services/index'


export class TeacherController extends CrudController<typeof teacherService>{
    constructor(){
        super(teacherService);
    }
    
}