import { CrudService } from '../crudService'
import { Class, ClassModel } from '../../models'

export class ClassService extends CrudService<typeof Class> {
    constructor(){
        super(Class);
    }
}