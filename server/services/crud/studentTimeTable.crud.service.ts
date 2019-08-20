import { CrudService } from '../crud.service'
import { StudentTimeTable, StudentTimeTableModel } from '../../models'

export class StudentTimeTableService extends CrudService<typeof StudentTimeTable> {
    constructor(){
        super(StudentTimeTable);
    }
}