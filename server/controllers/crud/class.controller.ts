import { CrudController } from '../crudController'
import { classService } from '../../services/index'


export class ClassController extends CrudController<typeof classService>{
    constructor(){
        super(classService);
    }
    
}