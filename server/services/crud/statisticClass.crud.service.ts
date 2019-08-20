import { CrudService } from '../crud.service'
import { StatisticClass, StatisticClassModel } from '../../models'

export class StatisticClassService extends CrudService<typeof StatisticClass> {
    constructor(){
        super(StatisticClass);
    }
}