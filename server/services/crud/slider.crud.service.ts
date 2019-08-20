import { CrudService } from '../crud.service'
import { Slider, SliderModel } from '../../models/index.model'

export class SliderService extends CrudService<typeof Slider> {
    constructor(){
        super(Slider);
    }
}