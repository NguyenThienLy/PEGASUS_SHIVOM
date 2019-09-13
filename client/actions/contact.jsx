import { BaseAction } from './base'
import { api } from '../services'

export class ContactAction extends BaseAction {
    constructor() {
        super("contact", api.contact, "contacts")
    }
    addRefresh = () => {
        return dispatch => {
            dispatch({
                type: `ADD_${this.name}_REFRESH`
            })
        }
    }
}