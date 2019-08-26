import { CrudController } from '../crud.controller'
import { settingService } from '../../services/index'


export class SettingController extends CrudController<typeof settingService>{
    constructor(){
        super(settingService);
    }
    
}