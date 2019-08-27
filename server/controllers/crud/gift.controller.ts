import { CrudController } from '../crud.controller'
import { giftService } from '../../services/index'


export class GiftController extends CrudController<typeof giftService>{
    constructor(){
        super(giftService);
    }
    
}