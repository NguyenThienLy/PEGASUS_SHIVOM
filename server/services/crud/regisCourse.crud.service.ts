import { CrudService } from '../crud.service'
import { RegisCourse, RegisCourseModel } from '../../models'

export class RegisCourseService extends CrudService<typeof RegisCourse> {
    constructor() {
        super(RegisCourse);
    }
}