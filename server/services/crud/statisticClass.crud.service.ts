import { CrudService } from '../crud.service'
import { StatisticClass, StatisticClassModel } from '../../models/index.model'

export class StatisticClassService extends CrudService<typeof StatisticClass> {
    constructor(){
        super(StatisticClass);
    }
}