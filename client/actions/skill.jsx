import { BaseAction } from './base'
import { api } from '../services'

export class SkillAction extends BaseAction {
    constructor() {
        super("skill", api.skill, "skills")
    }
}