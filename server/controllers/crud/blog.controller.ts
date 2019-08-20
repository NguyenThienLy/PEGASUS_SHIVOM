import { CrudController } from '../crud.controller'
import { blogService } from '../../services/index'


export class BlogController extends CrudController<typeof blogService>{
    constructor(){
        super(blogService);
    }
    
}