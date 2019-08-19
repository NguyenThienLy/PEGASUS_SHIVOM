import { CrudService } from '../crud.service'
import { TimeTableItem, TimeTableItemModel } from '../../models'

export class TimeTableItemService extends CrudService<typeof TimeTableItem> {
    constructor(){
        super(TimeTableItem);
    }
}