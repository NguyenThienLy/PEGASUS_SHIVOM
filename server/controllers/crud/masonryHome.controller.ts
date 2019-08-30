import { CrudController } from '../crud.controller'
import { masonryHomeService } from '../../services/index'


export class MasonryHomeController extends CrudController<typeof masonryHomeService>{
    constructor(){
        super(masonryHomeService);
    }
    
}