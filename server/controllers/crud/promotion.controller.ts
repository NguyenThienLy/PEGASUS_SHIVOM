import { CrudController } from '../crud.controller'
import { promotionService } from '../../services/index'


export class PromotionController extends CrudController<typeof promotionService>{
    constructor(){
        super(promotionService);
    }
    
}