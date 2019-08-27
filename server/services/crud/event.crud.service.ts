import { CrudService } from '../crud.service'
import { Event, EventModel } from '../../models'

export class EventService extends CrudService<typeof Event> {
    constructor() {
        super(Event);
    }
}