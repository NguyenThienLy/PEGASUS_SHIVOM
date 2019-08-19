import { CrudController } from '../crud.controller'
import { newCategoryService } from '../../services/index'


export class NewCategoryController extends CrudController<typeof newCategoryService>{
    constructor(){
        super(newCategoryService);
    }
    
}