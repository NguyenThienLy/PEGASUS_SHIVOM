
import { BaseReducer } from './base'

export class NewsReducer extends BaseReducer {
    constructor() {
        super("news")
        this.initState = {
            pinned: null,
            items: [],
            fetching: false,
            fetchError: null,
            updating: false,
            updateError: null,
            adding: false,
            addError: null,
            deleting: false,
            deleteError: null
        }
        this.customActions = {
            getPinnedPending: `${this.name}_GET_PINNED_PENDING`,
            getPinnedSucess: `${this.name}_GET_PINNED_SUCCESS`,
            getPinnedError: `${this.name}_GET_PINNED_ERROR`
        }
    }

    customReducer(state, action) {
        switch (action.type) {
            case this.customActions.getPinnedPending:

                break
            case this.customActions.getPinnedSucess:
                state = { ...state, pinned: action.payload };
                break
            case this.customActions.getPinnedError:
                state = { ...state, pinned: action.payload }
                break
            case this.customActions.loginClear:
                state = _.merge({}, {
                    login: {
                        isPending: false,
                        isError: false,
                        error: null,
                        isLogon: false
                    },
                    data: null
                })
                break
        }
        return state
    }
}