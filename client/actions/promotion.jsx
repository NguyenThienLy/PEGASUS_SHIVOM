import { BaseAction } from './base'
import { api } from '../services'

export class PromotionAction extends BaseAction {
    constructor() {
        super("promotion", api.promotion)
    }
}