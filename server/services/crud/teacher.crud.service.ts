import { CrudService } from '../crud.service'
import { Teacher, TeacherModel } from '../../models/index.model'

export class TeacherService extends CrudService<typeof Teacher> {
    constructor(){
        super(Teacher);
    }
}