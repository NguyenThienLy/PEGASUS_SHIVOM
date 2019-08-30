import { CrudService } from '../crud.service'
import { MasonryHome, MasonryHomeModel } from '../../models'

export class MasonryHomeService extends CrudService <typeof MasonryHome > {
    constructor() {
        super(MasonryHome);
    }
}