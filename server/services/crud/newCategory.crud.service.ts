import { CrudService } from '../crud.service'
import { NewCategory, NewCategoryModel } from '../../models/index.model'

export class NewCategoryService extends CrudService<typeof NewCategory> {
    constructor(){
        super(NewCategory);
    }
}