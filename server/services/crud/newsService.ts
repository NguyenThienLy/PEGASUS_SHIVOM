import { CrudService } from '../crudService'
import { News, NewsModel } from '../../models'

export class NewsService extends CrudService<typeof News> {
    constructor(){
        super(News);
    }
}