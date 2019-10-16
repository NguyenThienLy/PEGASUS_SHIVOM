import { BaseAction } from './base'
import { api } from '../services'
export class FeedbackAction extends BaseAction {
    constructor() {
        super("feedback", api.feedback, "feedbacks")
    }
    updateIgnoreFeedbacks = (id, body, option = {}) => {
        return dispatch => {
            dispatch({
                type: `UPDATE_${this.name}_PENDING`
            })
            this.api.update(id, body, option)
                .then(res => {
                    //console.log(" res.result.object", res.result.object)
                    dispatch({
                        type: `UPDATE_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    dispatch({
                        type: `DELETE_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    return res
                })
                .catch(error => {
                    dispatch({
                        type: `UPDATE_${this.name}_ERROR`,
                        payload: error
                    })
                })
        }
    }

    updateConfirmFeedbacks = (id, body, option = {}) => {
        return dispatch => {
            dispatch({
                type: `UPDATE_${this.name}_PENDING`
            })
            this.api.updateConfirmFeedbacks(id, body, option)
                .then(res => {
                    dispatch({
                        type: `UPDATE_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    dispatch({
                        type: `DELETE_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    return res
                })
                .catch(error => {
                    dispatch({
                        type: `UPDATE_${this.name}_ERROR`,
                        payload: error
                    })
                })
        }
    }
}