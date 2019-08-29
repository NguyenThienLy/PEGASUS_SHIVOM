import { CrudController } from '../crud.controller'
import { courseStudentService } from '../../services/index'
import { CourseStudentModel } from '../../models';


export class CourseStudentController extends CrudController<typeof courseStudentService>{
    constructor() {
        super(courseStudentService);
    }
    async extend(params: {
        courseStudentId: string,
        endTime: string,
        isPayFee: boolean
    }) {
        return await this.service.update({
            endTime: params.endTime,
            isPayFee: params.isPayFee
        }, {
                filter: {
                    _id: params.courseStudentId
                }
            })
    }
}