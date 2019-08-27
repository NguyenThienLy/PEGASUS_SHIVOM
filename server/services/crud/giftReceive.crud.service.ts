import { CrudService } from '../crud.service'
import { GiftReceive, GiftReceiveModel } from '../../models'

export class GiftReceiveService extends CrudService <typeof GiftReceive > {
    constructor() {
        super(GiftReceive);
    }
}