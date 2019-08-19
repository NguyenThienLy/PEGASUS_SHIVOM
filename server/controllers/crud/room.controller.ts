import { CrudController } from '../crud.controller'
import { roomService } from '../../services/index'


export class RoomController extends CrudController<typeof roomService>{
    constructor(){
        super(roomService);
    }
    
}