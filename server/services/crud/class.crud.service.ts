import { CrudService } from '../crud.service'
import { Class, ClassModel } from '../../models/index.model'

export class ClassService extends CrudService<typeof Class> {
    constructor(){
        super(Class);
    }
}