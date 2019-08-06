import { BaseError } from './base'

export class RouterException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `router_exception_${key}`,
            message
        })
    }
}

export class RouterErrorService {
    constructor(){
        
    }
    somethingWentWrong(){
        return new RouterException('something_went_wrong',"Something went wrong!")
    }
    googleMapApiWrong(error){
        return new RouterException('google_map_api',error)
    }
}