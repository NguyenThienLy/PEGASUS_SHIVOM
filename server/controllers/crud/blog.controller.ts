import { CrudController } from '../crudController'
import { blogService } from '../../services/index'


export class BlogController extends CrudController<typeof blogService>{
    constructor(){
        super(blogService);
    }
    
}