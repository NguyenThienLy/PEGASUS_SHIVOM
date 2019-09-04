import { BaseAction } from './base'
import { api } from '../services'

export class CourseAction extends BaseAction {
    constructor() {
        super("course", api.course)
    }
}