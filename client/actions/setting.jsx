import { BaseAction } from './base'
import { api } from '../services'

export class SettingAction extends BaseAction {
    constructor() {
        super("setting", api.setting, "setting")
    }
    fetch = (option = {}) => {
        return dispatch => {
            dispatch({
                type: `FETCH_${this.name}_PENDING`
            })
            this.api.getList(option)
                .then(res => {
                    dispatch({
                        type: `FETCH_${this.name}_SUCCESS`,
                        payload: res.results.objects.rows[0]
                    })
                    return res
                })
                .catch(error => {
                    dispatch({
                        type: `FETCH_${this.name}_ERROR`,
                        payload: error
                    })
                })
        }
    }
}