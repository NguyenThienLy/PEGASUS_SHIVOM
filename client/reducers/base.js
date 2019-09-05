import * as _ from 'lodash'



export class BaseReducer {
    constructor(name) {
        this.name = name.toUpperCase()
        this.initState = {
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
        this.actions = {
            fetchPending: `FETCH_${this.name}_PENDING`,
            fetchSuccess: `FETCH_${this.name}_SUCCESS`,
            fetchError: `FETCH_${this.name}_ERROR`,
            addPending: `ADD_${this.name}_PENDING`,
            addSuccess: `ADD_${this.name}_SUCCESS`,
            addError: `ADD_${this.name}_ERROR`,
            deletePending: `DELETE_${this.name}_PENDING`,
            deleteSuccess: `DELETE_${this.name}_SUCCESS`,
            deleteError: `DELETE_${this.name}_ERROR`,
            updatePending: `EDIT_${this.name}_PENDING`,
            updateSuccess: `EDIT_${this.name}_SUCCESS`,
            updateError: `EDIT_${this.name}_ERROR`,
            concatPending: `CONCAT_${this.name}_PENDING`,
            concatSuccess: `CONCAT_${this.name}_SUCCESS`,
            concatError: `CONCAT_${this.name}_ERROR`,
        }
    }
    reducer = (state = this.initState, action) => {
        let itemIndex = -1
        switch (action.type) {
            case this.actions.fetchPending:
                state = { ...state, fetching: true };
                break
            case this.actions.fetchSuccess:
                state = { ...state, fetching: false, items: action.payload };
                break
            case this.actions.fetchError:
                state = { ...state, fetching: false, fetchError: action.payload };
                break
            case this.actions.addPending:
                state.unshift(action.payload)
                break
            case this.actions.addSuccess:
                state.unshift(action.payload)
                break
            case this.actions.addError:
                state.unshift(action.payload)
                break
            case this.actions.deletePending:
                break
            case this.actions.deleteSuccess:
                itemIndex = state.findIndex((item) => { return item._id === action.payload._id })
                if (itemIndex !== -1) {
                    state.splice(itemIndex, 1)
                }
                break
            case this.actions.deleteError:
                break
            case this.actions.updatePending:
                break
            case this.actions.updateSuccess:
                itemIndex = state.findIndex((item) => { return item._id === action.payload._id })
                if (itemIndex !== -1) {
                    state[itemIndex] = action.payload
                }
                break
            case this.actions.updateError:
                break
            case this.actions.concatPending:
                break
            case this.actions.concat:
                const actionPayload = Array.isArray(action.payload) ? action.payload : [action.payload]
                state = _.unionBy(state.concat(action.payload), "_id")
                break
            case this.actions.concatError:
                break
        }
        return state
    }
}