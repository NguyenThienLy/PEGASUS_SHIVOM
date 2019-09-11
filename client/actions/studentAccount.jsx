import { BaseAction } from './base'
import { api } from '../services'

export class StudentAccountAction extends BaseAction {
    constructor() {
        super("studentAccount", api.student, "studentAccount")
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