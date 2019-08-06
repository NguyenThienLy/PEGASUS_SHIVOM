import { CrudService } from '../crudService'
import { TimeTableItem, TimeTableItemModel } from '../../models'

export class TimeTableItemService extends CrudService<typeof TimeTableItem> {
    constructor(){
        super(TimeTableItem);
    }
}