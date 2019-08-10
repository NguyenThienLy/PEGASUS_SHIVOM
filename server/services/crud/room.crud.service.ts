import { CrudService } from '../crudService'
import { Room, RoomModel } from '../../models'

export class RoomService extends CrudService<typeof Room> {
    constructor(){
        super(Room);
    }
}