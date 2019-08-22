import { CrudService } from '../crud.service'
import { StatisticCourse } from '../../models'

export class StatisticCourseService extends CrudService<typeof StatisticCourse> {
    constructor(){
        super(StatisticCourse);
    }
}