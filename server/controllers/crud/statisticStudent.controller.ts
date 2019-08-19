import { CrudController } from '../crud.controller'
import { statisticStudentService } from '../../services/index'


export class StatisticStudentController extends CrudController<typeof statisticStudentService>{
    constructor(){
        super(statisticStudentService);
    }
    
}