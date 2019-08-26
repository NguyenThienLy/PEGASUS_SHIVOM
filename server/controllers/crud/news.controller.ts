import { CrudController } from '../crud.controller'
import { newsService, sliderService, ICrudOption } from '../../services/index'
import { SliderModel } from '../../models';


export class NewsController extends CrudController<typeof newsService>{
    constructor() {
        super(newsService);
    }
    async getItemFromClient(option?: ICrudOption) {
        this.service.update({
            $inc: { view: 1 }
        }, option)
        return await this.service.getItem(option)
    }
    async setNewsAtSlider(params: {
        newsId: string
        title: string
        image: string
        description: string
        buttonTitle: string
    }) {
        const slider: SliderModel = await sliderService.create({
            type: "news",
            option: params
        })
        return await newsService.update({
            isUseAtSlider: true,
            slider: slider._id
        }, {
                filter: {
                    _id: params.newsId
                }
            })

    }

}