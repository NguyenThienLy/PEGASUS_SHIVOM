import { CrudController } from '../crudController'
import { roomService } from '../../services/index'


export class RoomController extends CrudController<typeof roomService>{
    constructor(){
        super(roomService);
    }
    
}