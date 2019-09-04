import { BaseAction } from './base'
import { api } from '../services'

export class AdminAction extends BaseAction {
    constructor() {
        super("admin", api.admin)
    }
}