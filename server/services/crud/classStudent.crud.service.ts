import { CrudService } from '../crud.service'
import { ClassStudent } from '../../models/index.model'

export class ClassStudentService extends CrudService<typeof ClassStudent> {
    constructor(){
        super(ClassStudent);
    }
}