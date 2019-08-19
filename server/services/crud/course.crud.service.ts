import { CrudService } from '../crudService'
import { Course, CourseModel } from '../../models'

export class CourseService extends CrudService<typeof Course> {
    constructor(){
        super(Course);
    }
}