import { BaseAction } from './base'
import { api } from '../services'

export class TimeTableItemAction extends BaseAction {
    constructor() {
        super("timeTableItem", api.timeTableItem)
    }
}