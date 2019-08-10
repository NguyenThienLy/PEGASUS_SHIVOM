import { CrudController } from '../crudController'
import { statisticStudentService } from '../../services/index'


export class StatisticStudentController extends CrudController<typeof statisticStudentService>{
    constructor(){
        super(statisticStudentService);
    }
    
}