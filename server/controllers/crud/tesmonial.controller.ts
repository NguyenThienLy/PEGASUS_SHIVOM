import { CrudController } from '../crud.controller'
import { tesmonialService } from '../../services/index'


export class TesmonialController extends CrudController<typeof tesmonialService>{
    constructor(){
        super(tesmonialService);
    }
    
}