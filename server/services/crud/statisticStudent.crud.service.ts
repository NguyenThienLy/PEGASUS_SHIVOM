import { CrudService } from '../crudService'
import { StatisticStudent, StatisticStudentModel } from '../../models'

export class StatisticStudentService extends CrudService<typeof StatisticStudent> {
    constructor(){
        super(StatisticStudent);
    }
}