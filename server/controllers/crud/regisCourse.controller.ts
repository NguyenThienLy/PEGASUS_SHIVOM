import { CrudController } from '../crud.controller'
import { regisCourseService } from '../../services/index'


export class RegisCourseController extends CrudController<typeof regisCourseService>{
    constructor(){
        super(regisCourseService);
    }
    
}