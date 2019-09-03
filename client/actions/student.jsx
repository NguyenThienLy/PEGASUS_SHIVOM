import { BaseAction } from './base'
import { api } from '../services'

export class StudentAction extends BaseAction {
    constructor() {
        super("student", api.student)
    }
}