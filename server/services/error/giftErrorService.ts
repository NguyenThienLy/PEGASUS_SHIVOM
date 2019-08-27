import { BaseError } from './base'

export class GiftException extends BaseError {
    constructor(key: string, message: string, code?: number) {
        super({
            code: code || 403,
            type: `gift_exception_${key}`,
            message
        })
    }
}

export class GiftErrorService {
    constructor() {

    }
    giftNotEnough() {
        return new GiftException("gift_not_enough", "Quà không đủ")
    }
    giftLimited() {
        return new GiftException("gift_limited", "Số lượng quà được nhận bị giới hạn")
    }
    premature() {
        return new GiftException("premature", "Chưa tới hạn nhận quà")
    }
    late() {
        return new GiftException("late", "Hết hạn nhận quà")
    }
    notAchievedCondition() {
        return new GiftException("not_achieved_condition", "Không thoả điều kiện để nhận quà")
    }
    notEnoughPoint() {
        return new GiftException("not_enough_point", "Không đủ điểm nhận quà")
    }

}