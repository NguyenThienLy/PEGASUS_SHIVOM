import { CrudController } from '../crud.controller'
import { checkinService } from '../../services/index'


export class CheckinController extends CrudController<typeof checkinService>{
    constructor(){
        super(checkinService);
    }
    
}