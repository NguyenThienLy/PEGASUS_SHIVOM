import { BaseError } from './base'

export class GiftReceiveException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `gift_receive_exception_${key}`,
            message
        })
    }
}

export class GiftReceiveErrorService {
    constructor() {

    }
    alreadyReceived() {
        return new GiftReceiveException("already_received", "Đã nhận quà này")
    }


}