import BaseAction from './base'

export class UserAction extends BaseAction {
    constructor(){
        super("user")
    }
    login(body){
        return {
            type: `LOGIN`,
            payload: body
        }
    }
    logout(){
        return {
            type: `LOGOUT`
        }
    }
    
}