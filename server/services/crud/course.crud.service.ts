import { CrudService } from '../crud.service'
import { Course, CourseModel } from '../../models'

export class CourseService extends CrudService<typeof Course> {
    constructor(){
        super(Course);
    }
}