import { CrudService } from '../crudService'
import { StatisticClass, StatisticClassModel } from '../../models'

export class StatisticClassService extends CrudService<typeof StatisticClass> {
    constructor(){
        super(StatisticClass);
    }
}