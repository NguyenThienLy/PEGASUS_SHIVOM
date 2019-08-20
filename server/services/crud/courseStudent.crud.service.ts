import { CrudService } from '../crud.service'
import { CourseStudent } from '../../models'

export class CourseStudentService extends CrudService<typeof CourseStudent> {
    constructor(){
        super(CourseStudent);
    }
}