import { CrudService } from '../crud.service'
import { Course, CourseModel } from '../../models/index.model'

export class CourseService extends CrudService<typeof Course> {
    constructor(){
        super(Course);
    }
}