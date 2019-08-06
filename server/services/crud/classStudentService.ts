import { CrudService } from '../crudService'
import { ClassStudent } from '../../models'

export class ClassStudentService extends CrudService<typeof ClassStudent> {
    constructor(){
        super(ClassStudent);
    }
}