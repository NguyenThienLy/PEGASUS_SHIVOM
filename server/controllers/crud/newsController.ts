import { CrudController } from '../crudController'
import { newsService } from '../../services/index'


export class NewsController extends CrudController<typeof newsService>{
    constructor(){
        super(newsService);
    }
    
}