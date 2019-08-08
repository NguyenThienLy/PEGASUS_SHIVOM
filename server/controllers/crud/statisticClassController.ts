import { CrudController } from '../crudController'
import { statisticClassService } from '../../services/index'


export class StatisticClassController extends CrudController<typeof statisticClassService>{
    constructor(){
        super(statisticClassService);
    }
    
}