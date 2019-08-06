import { CrudService } from '../crudService'
import { Checkin, CheckinModel } from '../../models'

export class CheckinService extends CrudService<typeof Checkin> {
    constructor(){
        super(Checkin);
    }
}