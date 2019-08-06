import { CrudService } from '../crudService'
import { NewCategory, NewCategoryModel } from '../../models'

export class NewCategoryService extends CrudService<typeof NewCategory> {
    constructor(){
        super(NewCategory);
    }
}