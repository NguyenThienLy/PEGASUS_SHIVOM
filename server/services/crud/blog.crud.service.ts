import { CrudService } from '../crud.service'
import { Blog, BlogModel } from '../../models'

export class BlogService extends CrudService<typeof Blog> {
    constructor(){
        super(Blog);
    }
}