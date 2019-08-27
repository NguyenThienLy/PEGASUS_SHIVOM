import { CrudService } from '../crud.service'
import { Promotion, PromotionModel } from '../../models'

export class PromotionService extends CrudService<typeof Promotion> {
    constructor() {
        super(Promotion);
    }
}