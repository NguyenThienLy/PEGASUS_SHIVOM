import { BaseAction } from './base'
import { api } from '../services'

export class TimeTableAction extends BaseAction {
    constructor() {
        super("timeTable", null, "timeTable")
    }
    fetch = (option = {}) => {

        return dispatch => {
            dispatch(this.fetchPending())
            api.course.getAllTimeTable(option)
                .then(res => {
                    dispatch(this.fetchSuccess(res.results.objects.rows))
                    return res
                })
                .catch(error => {
                    dispatch(this.fetchError(error))
                })
        }
    }
}