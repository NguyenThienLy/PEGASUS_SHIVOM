
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
            _id: null,
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
            updatePending: `UPDATE_${this.name}_PENDING`,
            updateSuccess: `UPDATE_${this.name}_SUCCESS`,
            updateError: `UPDATE_${this.name}_ERROR`
        }
    }

    reducer = (state = this.initState, action) => {
        let itemIndex = -1
        switch (action.type) {
            case this.actions.fetchPending:
                state = { ...state, fetching: true };
                break
            case this.actions.fetchSuccess:

                state = { ...state, logo: action.payload.logo, contact: action.payload.contact, social: action.payload.social, _id: action.payload._id, fetched: true, fetching: false };
                break
            case this.actions.fetchError:
                state = { ...state, fetching: false, fetchError: action.payload };
                break
            case this.actions.updatePending:
                break
            case this.actions.updateSuccess:
                state = { ...state, _id: action.payload._id, logo: action.payload.logo, contact: action.payload.contact, social: action.payload.social };
                break
            case this.actions.updateError:
                break

        }
        return state
    }
}