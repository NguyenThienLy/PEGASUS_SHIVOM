import { BaseAction } from './base'
import { api } from '../services'
export class FeedbackAction extends BaseAction {
    constructor() {
        super("feedback", api.feedback)
    }
}