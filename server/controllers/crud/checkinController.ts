import { CrudController } from '../crudController'
import { checkinService } from '../../services/index'


export class CheckinController extends CrudController<typeof checkinService>{
    constructor(){
        super(checkinService);
    }
    
}