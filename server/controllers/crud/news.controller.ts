import { CrudController } from '../crud.controller'
import { newsService, sliderService } from '../../services/index'
import { SliderModel } from '../../models';


export class NewsController extends CrudController<typeof newsService>{
    constructor() {
        super(newsService);
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