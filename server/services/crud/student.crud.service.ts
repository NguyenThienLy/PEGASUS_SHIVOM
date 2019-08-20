import { CrudService } from '../crud.service'
import { Student, StudentModel } from '../../models/index.model'

export class StudentService extends CrudService<typeof Student> {
    constructor(){
        super(Student);
    }
}