import { CrudService } from '../crud.service'
import { Room, RoomModel } from '../../models/index.model'

export class RoomService extends CrudService<typeof Room> {
    constructor(){
        super(Room);
    }
}