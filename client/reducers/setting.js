
import { BaseReducer } from './base'

export class SettingReducer extends BaseReducer {
    constructor() {
        super("setting")
        this.initState = {
            fetched: false,
            fetching: false,
            fetchError: null,
            updating: false,
            updateError: null,
            logo: null,
            contact: {
                branch: null,
                description: null,
                phone: null,
                hotline: null,
                email: null,
                address: null,
                long: null,
                lat: null
            },
            social: {
                facebook: "",
                google: "",
                instagram: "",
                youtube: ""
            }
        }
        this.actions = {
            fetchPending: `FETCH_${this.name}_PENDING`,
            fetchSuccess: `FETCH_${this.name}_SUCCESS`,
            fetchError: `FETCH_${this.name}_ERROR`,
            updatePending: `EDIT_${this.name}_PENDING`,
            updateSuccess: `EDIT_${this.name}_SUCCESS`,
            updateError: `EDIT_${this.name}_ERROR`
        }
    }

    reducer = (state = this.initState, action) => {
        let itemIndex = -1
        switch (action.type) {
            case this.actions.fetchPending:
                state = { ...state, fetching: true };
                break
            case this.actions.fetchSuccess:
                state = { ...state, logo: action.payload.logo, contact: action.payload.contact, social: action.payload.social, fetched: true };
                break
            case this.actions.fetchError:
                state = { ...state, fetching: false, fetchError: action.payload };
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

        }
        return state
    }
}