import { CrudService } from '../crud.service'
import { Setting, SettingModel } from '../../models'

export class SettingService extends CrudService<typeof Setting> {
    constructor() {
        super(Setting);
    }
}