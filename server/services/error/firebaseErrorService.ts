import { BaseError } from './base'

export class FirebaseException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `firebase_exception_${key}`,
            message
        })
    }
}

export class FirebaseErrorService {
    constructor(){
        
    }
}