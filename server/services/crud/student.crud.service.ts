import { CrudService } from '../crud.service'
import { Student, StudentModel } from '../../models'

export class StudentService extends CrudService<typeof Student> {
    constructor(){
        super(Student);
    }
}