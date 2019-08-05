import { BaseError } from './base'

export class DatabaseException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `database_exception_${key}`,
            message
        })
    }
}

export class DatabaseErrorService {
    constructor(){
        
    }
    query(){
        return new DatabaseException('query',"Database query error",401)
    }
}