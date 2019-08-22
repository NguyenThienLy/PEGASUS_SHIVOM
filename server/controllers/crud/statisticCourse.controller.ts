import { CrudController } from '../crud.controller'
import { statisticCourseService } from '../../services/index'


export class StatisticCourseController extends CrudController<typeof statisticCourseService>{
    constructor(){
        super(statisticCourseService);
    }
    
}