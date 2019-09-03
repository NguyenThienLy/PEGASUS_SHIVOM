import { CrudApi } from '../crud'

export class StudentApi extends CrudApi {
    constructor() {
        super("student")
    }
}