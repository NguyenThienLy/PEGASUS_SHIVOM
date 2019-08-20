import { CrudService } from '../crud.service'
import { Blog, BlogModel } from '../../models/index.model'

export class BlogService extends CrudService<typeof Blog> {
    constructor(){
        super(Blog);
    }
}