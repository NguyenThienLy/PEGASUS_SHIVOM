import { CrudApi } from '../crud'

export class TeacherApi extends CrudApi {
    constructor() {
        super("teacher")
    }
}