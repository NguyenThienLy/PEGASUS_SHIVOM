import { CrudApi } from '../crud'

export class EventApi extends CrudApi {
    constructor() {
        super("event")
    }
}