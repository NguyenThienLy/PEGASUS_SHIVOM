import { BaseAction } from './base'
import { api } from '../services'
export class EventAction extends BaseAction {
    constructor() {
        super("event", api.event, "events")
    }
}