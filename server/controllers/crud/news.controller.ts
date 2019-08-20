import { CrudController } from '../crud.controller'
import { newsService } from '../../services/index'


export class NewsController extends CrudController<typeof newsService>{
    constructor(){
        super(newsService);
    }
    
}