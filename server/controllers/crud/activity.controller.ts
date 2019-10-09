import { CrudController } from '../crud.controller'
import { activityService } from '../../services/index'


export class ActivityController extends CrudController<typeof activityService>{
    constructor(){
        super(activityService);
    }
    
}