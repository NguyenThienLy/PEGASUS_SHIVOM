import * as jwt from 'jwt-simple'
import * as moment from 'moment'
import { config } from '../config'
import { errorService } from './index';

export class TokenService{
    async generateToken(payload: any = {}, secret: string){
        return jwt.encode(payload, secret)
    }
    async decode(token,secret: string){
        try{
            return jwt.decode(token, secret)
        } catch(error){
            throw errorService.auth.badToken()
        }
    }
    async getCustomerToken(secret){
        secret = secret + config.token.secret
        return jwt.encode({role:"customer"}, secret)
    }
    async getCompanyToken(secret){
        secret = secret + config.token.secret
        return jwt.encode({role:"company"}, secret)
    }
}