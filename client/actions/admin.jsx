import { BaseAction } from './base'
import { api } from '../services'

export class AdminAction extends BaseAction {
    constructor() {
        super("admin", api.admin, "admin")
    }
    login = (username, password) => {
        return dispatch => {
            dispatch({
                type: `${this.name}_LOGIN_PENDING`
            })
            this.api.login(username, password)
                .then(res => {
                    dispatch({
                        type: `${this.name}_LOGIN_SUCCESS`,
                        payload: res.result.object
                    })
                    // Ghi data vao admin 
                })
                .catch(err => {
                    dispatch({
                        type: `${this.name}_LOGIN_ERROR`,
                        payload: err
                    })
                })
        }
    }
    loginClear = () => {
        return dispatch => {
            dispatch({
                type: `${this.name}_LOGIN_CLEAR`
            })
        }
    }
    logout = () => {
        return dispatch => {
            dispatch({
                type: `${this.name}_LOGOUT_PENDING`
            })
            // Thay doi localstorage

            dispatch({
                type: `${this.name}_LOGOUT_SUCCESS`
            })
        }
    }
}