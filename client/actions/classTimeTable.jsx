import { BaseAction } from './base'
import { api } from '../services'

export class ClassTimeTableAction extends BaseAction {
    constructor() {
        super("classTimeTable", api.classTimeTable)
    }
}