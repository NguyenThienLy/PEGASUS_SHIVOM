import { CrudService } from '../crudService'
import { ClassTimeTable, ClassTimeTableModel } from '../../models'

export class ClassTimeTableService extends CrudService<typeof ClassTimeTable> {
    constructor(){
        super(ClassTimeTable);
    }
}