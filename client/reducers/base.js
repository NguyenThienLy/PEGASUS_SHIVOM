import * as _ from 'lodash'

export class BaseReducer {
    constructor(name) {
        this.name = name.toUpperCase()
        this.initState = []
        this.actions = {
            fetch: `FETCH_${this.name}`,
            add: `ADD_${this.name}`,
            delete: `DELETE_${this.name}`,
            edit: `EDIT_${this.name}`,
            concat: `CONCAT_${this.name}`
        }
    }
    reducer = (state = this.initState, action) => {
        let itemIndex = -1
        switch (action.type) {
            case this.actions.fetch:
                state = action.payload;
                break
            case this.actions.add:
                state.unshift(action.payload)
                break
            case this.actions.delete:
                itemIndex = state.findIndex((item) => { return item._id === action.payload._id })
                if (itemIndex !== -1) {
                    state.splice(itemIndex, 1)
                }
                break
            case this.actions.edit:
                itemIndex = state.findIndex((item) => { return item._id === action.payload._id })
                if (itemIndex !== -1) {
                    state[itemIndex] = action.payload
                }
                break
            case this.actions.concat:
                const actionPayload = Array.isArray(action.payload) ? action.payload : [action.payload]
                state = _.unionBy(state.concat(action.payload), "_id")
                break
        }
        return state
    }
}