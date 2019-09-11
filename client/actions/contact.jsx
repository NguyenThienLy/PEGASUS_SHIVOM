import { BaseAction } from './base'
import { api } from '../services'

export class ContactAction extends BaseAction {
    constructor() {
        super("contact", api.contact, "contacts")
    }
}