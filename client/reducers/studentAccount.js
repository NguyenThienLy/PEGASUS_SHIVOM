
import { BaseReducer } from './base'
import * as _ from 'lodash'

export class StudentAccountReducer extends BaseReducer {
    constructor() {
        super("studentAccount")
        this.initState = {
            data: null,
            login: {
                isPending: false,
                isError: false,
                error: null,
                isLogon: false
            }

        }
        this.customActions = {
            loginPending: `${this.name}_LOGIN_PENDING`,
            loginSuccess: `${this.name}_LOGIN_SUCCESS`,
            loginError: `${this.name}_LOGIN_ERROR`,
            loginClear: `${this.name}_LOGIN_CLEAR`
        }
    }

    customReducer(state, action) {
        switch (action.type) {
            case this.customActions.loginPending:
                state = _.merge({}, {
                    login: {
                        isPending: true,
                        isError: false,
                        error: null,
                        isLogon: false
                    },
                    data: null
                })
                break
            case this.customActions.loginSuccess:
                state = _.merge({}, {
                    login: {
                        isPending: false,
                        isError: false,
                        error: null,
                        isLogon: true
                    },
                    data: action.payload
                })
                break
            case this.customActions.loginError:
                state = _.merge({}, {
                    login: {
                        isPending: false,
                        isError: true,
                        error: action.payload,
                        isLogon: false
                    }
                })
                break
            case this.customActions.loginClear:
                state = _.merge({}, {
                    login: {
                        isPending: false,
                        isError: false,
                        error: null,
                        isLogon: false
                    }
                })
                break
        }
        return state
    }
}