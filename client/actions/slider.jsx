import { BaseAction } from './base'
import { api } from '../services'

export class SliderAction extends BaseAction {
    constructor() {
        super("slider", api.slider)
    }
}