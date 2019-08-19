import { CrudService } from '../crudService'
import { Skill, SkillModel } from '../../models'

export class SkillService extends CrudService<typeof Skill> {
    constructor(){
        super(Skill);
    }
}