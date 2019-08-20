import { CrudController } from '../crud.controller'
import { {name}Service } from '../../services/index'


export class {Name}Controller extends CrudController<typeof {name}Service>{
    constructor(){
        super({name}Service);
    }
    
}