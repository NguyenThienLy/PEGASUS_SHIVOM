import { BaseAction } from './base'
import { api } from '../services'

export class TeacherAction extends BaseAction {
    constructor() {
        super("teacher", api.teacher, "teachers")
    }
}