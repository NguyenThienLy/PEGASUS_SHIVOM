import 'isomorphic-unfetch'
import { CrudApi } from '../crud'
import * as _ from 'lodash'

export class UserFollowApi extends CrudApi {
    constructor(){
        super("userFollow")
    }
    
}