import { CrudService } from '../crud.service'
import { Skill, SkillModel } from '../../models/index.model'

export class SkillService extends CrudService<typeof Skill> {
    constructor(){
        super(Skill);
    }
}