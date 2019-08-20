import { CrudService } from '../crud.service'
import { Slider, SliderModel } from '../../models'

export class SliderService extends CrudService<typeof Slider> {
    constructor(){
        super(Slider);
    }
}