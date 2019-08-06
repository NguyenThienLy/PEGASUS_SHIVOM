import { CrudService } from '../crudService'
import { TimeTable, TimeTableModel } from '../../models'

export class TimeTableService extends CrudService<typeof TimeTable> {
    constructor(){
        super(TimeTable);
    }
}