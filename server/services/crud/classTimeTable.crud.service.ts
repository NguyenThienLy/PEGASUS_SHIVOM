import { CrudService } from '../crud.service'
import { ClassTimeTable, ClassTimeTableModel } from '../../models/index.model'

export class ClassTimeTableService extends CrudService<typeof ClassTimeTable> {
    constructor(){
        super(ClassTimeTable);
    }
}