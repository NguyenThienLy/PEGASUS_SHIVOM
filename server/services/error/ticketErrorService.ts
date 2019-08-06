import { BaseError } from './base'

export class TicketException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `ticket_exception_${key}`,
            message
        })
    }
}

export class TicketErrorService {
    constructor(){
        
    }
}