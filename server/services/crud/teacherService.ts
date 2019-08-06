import { CrudService } from '../crudService'
import { Teacher, TeacherModel } from '../../models'

export class TeacherService extends CrudService<typeof Teacher> {
    constructor(){
        super(Teacher);
    }
}