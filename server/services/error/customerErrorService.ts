import { BaseError } from './base'

export class CustomerException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `customer_exception_${key}`,
            message
        })
    }
}

export class CustomerErrorService {
    constructor(){
        
    }
}