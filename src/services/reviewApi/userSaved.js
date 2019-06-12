import 'isomorphic-unfetch'
import { CrudApi } from '../crud'
import * as _ from 'lodash'

export class UserSavedApi extends CrudApi {
    constructor(){
        super("userSaved")
    }
    
}