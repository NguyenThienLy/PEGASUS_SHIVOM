import { BaseAction } from './base'
import { api } from '../services'

export class ClassAction extends BaseAction {
    constructor() {
        super("class", api.class, "classes")
    }
}