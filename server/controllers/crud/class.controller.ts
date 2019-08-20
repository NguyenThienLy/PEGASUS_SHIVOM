import { CrudController } from '../crud.controller'
import { classService } from '../../services/index'


export class ClassController extends CrudController<typeof classService>{
    constructor(){
        super(classService);
    }
    
}