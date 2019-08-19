import { CrudController } from '../crud.controller'
import { rankService } from '../../services/index'


export class RankController extends CrudController<typeof rankService>{
    constructor(){
        super(rankService);
    }
    
}