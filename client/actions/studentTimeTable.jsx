import { BaseAction } from './base'
import { api } from '../services'

export class StudentTimeTableAction extends BaseAction {
    constructor() {
        super("studentTimeTable", api.studentTimeTable, "studentTimeTables")
    }
} 