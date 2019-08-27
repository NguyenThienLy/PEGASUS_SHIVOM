import { CrudService } from '../crud.service'
import { Gift, GiftModel } from '../../models'

export class GiftService extends CrudService<typeof Gift> {
    constructor() {
        super(Gift);
    }
}