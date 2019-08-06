import { BaseError } from './base'

export class CompanyException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `company_exception_${key}`,
            message
        })
    }
}

export class CompanyErrorService {
    constructor(){
        
    }
}