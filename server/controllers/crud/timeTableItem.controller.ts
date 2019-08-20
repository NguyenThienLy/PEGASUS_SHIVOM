import { CrudController } from '../crud.controller'
import { timeTableItemService, ICrudOption } from '../../services/index'


export class TimeTableItemController extends CrudController<typeof timeTableItemService>{
    constructor() {
        super(timeTableItemService);
    }
    async update(params: any, option?: ICrudOption) {
        if (params.startTime && params.startTime.hour && params.startTime.minute !== undefined) {
            params.startTime.number = params.startTime.hour * 60 + params.startTime.minute
        }
        if (params.endTime && params.endTime.hour && params.endTime.minute !== undefined) {
            params.endTime.number = params.endTime.hour * 60 + params.endTime.minute
        }
        if (params.startAvailableCheckinTime && params.startAvailableCheckinTime.hour && params.startAvailableCheckinTime.minute !== undefined) {
            params.startAvailableCheckinTime.number = params.startAvailableCheckinTime.hour * 60 + params.startAvailableCheckinTime.minute
        }
        if (params.endAvailabelCheckinTime && params.endAvailabelCheckinTime.hour && params.endAvailabelCheckinTime.minute !== undefined) {
            params.endAvailabelCheckinTime.number = params.endAvailabelCheckinTime.hour * 60 + params.endAvailabelCheckinTime.minute
        }
        return await this.service.update(params, option)
    }

}