import { BaseAction } from './base'
import { api } from '../services'

export class TesmonialAction extends BaseAction {
    constructor() {
        super("tesmonial", api.tesmonial)
    }
}