import { CrudService } from '../crud.service'
import { Rank, RankModel } from '../../models'

export class RankService extends CrudService<typeof Rank> {
    constructor(){
        super(Rank);
    }
}