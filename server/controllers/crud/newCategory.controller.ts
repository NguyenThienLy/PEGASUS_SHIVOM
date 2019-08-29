import { CrudController } from '../crud.controller'
import { newCategoryService, newsService } from '../../services/index'


export class NewCategoryController extends CrudController<typeof newCategoryService>{
    constructor() {
        super(newCategoryService);
    }
    async countNewsOfCategory(params: {
        categoryId: string
    }) {
        const result = await newsService.model.count({ category: params.categoryId })
        return { count: result }
    }
    async countNews() {
        return await newsService.model.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "newcategories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category"
                }
            }, {
                $unwind: "$category"
            }
        ])
    }
}