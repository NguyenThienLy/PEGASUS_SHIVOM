import { CrudService } from '../crud.service'
import { ClassStudent } from '../../models'

export class ClassStudentService extends CrudService<typeof ClassStudent> {
    constructor(){
        super(ClassStudent);
    }
}