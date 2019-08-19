import { CrudService } from '../crud.service'
import { Class, ClassModel } from '../../models'

export class ClassService extends CrudService<typeof Class> {
    constructor(){
        super(Class);
    }
}