import { CrudController } from '../crud.controller'
import { sliderService, ICrudOption, newsService } from '../../services/index'
import { SliderModel } from '../../models';


export class SliderController extends CrudController<typeof sliderService>{
    constructor() {
        super(sliderService);
    }
    async delete(option?: ICrudOption) {
        const slider: SliderModel = await sliderService.getItem(option)
        switch (slider.type) {
            case "news":
                await newsService.update({
                    isUseAtSlider: false,
                    slider: null
                })
                break
            case "promotion":
                break
        }
        return await this.service.delete(option)
    }

}