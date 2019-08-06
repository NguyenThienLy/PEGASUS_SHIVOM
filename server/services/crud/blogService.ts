import { CrudService } from '../crudService'
import { Blog, BlogModel } from '../../models'

export class BlogService extends CrudService<typeof Blog> {
    constructor(){
        super(Blog);
    }
}