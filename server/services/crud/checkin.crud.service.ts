import { CrudService } from '../crud.service'
import { Checkin, CheckinModel } from '../../models/index.model'

export class CheckinService extends CrudService<typeof Checkin> {
    constructor(){
        super(Checkin);
    }
}