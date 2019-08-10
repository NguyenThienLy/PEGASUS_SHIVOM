import { CrudController } from '../crudController'
import { sliderService } from '../../services/index'


export class SliderController extends CrudController<typeof sliderService>{
    constructor(){
        super(sliderService);
    }
    
}