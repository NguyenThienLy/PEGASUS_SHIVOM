import { BaseAction } from './base'
import { api } from '../services'

export class TimeTableAction extends BaseAction {
    constructor() {
        super("timeTable", api.tesmonial)
    }
    fetch = (option = {}) => {

        return dispatch => {
            dispatch(this.fetchPending())
            api.course.getAllTimeTable(option)
                .then(res => {
                    console.log("response: ", res)
                    dispatch(this.fetchSuccess(res.results.objects.rows))
                    return res
                })
                .catch(error => {
                    dispatch(this.fetchError(error))
                })
        }
    }
}