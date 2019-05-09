import { CrudApi } from '../crud'

export class UserApi extends CrudApi {
    constructor(){
        super("user")
    }
}