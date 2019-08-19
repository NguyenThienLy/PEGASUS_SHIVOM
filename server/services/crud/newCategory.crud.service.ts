import { CrudService } from '../crud.service'
import { NewCategory, NewCategoryModel } from '../../models'

export class NewCategoryService extends CrudService<typeof NewCategory> {
    constructor(){
        super(NewCategory);
    }
}