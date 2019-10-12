import { CrudService } from '../crud.service'
import { Activity, ActivityModel } from '../../models'

export class ActivityService extends CrudService <typeof Activity > {
    constructor() {
        super(Activity);
    }
}