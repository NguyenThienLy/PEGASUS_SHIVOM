import { CrudService } from '../crud.service'
import { StatisticStudent, StatisticStudentModel } from '../../models/index.model'

export class StatisticStudentService extends CrudService<typeof StatisticStudent> {
    constructor(){
        super(StatisticStudent);
    }
}