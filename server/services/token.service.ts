import * as jwt from 'jwt-simple'
import * as moment from 'moment'
import { config } from '../config'
import { errorService } from './index'

export class TokenService {
    async generateToken(payload: any = {}, secret: string) {
        return jwt.encode(payload, secret)
    }
    async decode(token, secret: string) {
        try {
            return jwt.decode(token, secret)
        } catch (error) {
            console.log(error)
            throw errorService.auth.badToken()
        }
    }
    async getAdminToken(payload: {
        _id: string
    }) {
        // Tạo khoa bi mat
        const secret = config.token.secret
        // Thoi gian het han cua token
        const expiredAt = moment().add(1, "days").format()
        return jwt.encode({ role: "admin", _id: payload._id, expiredAt }, secret)
    }
    async getStudentToken(payload: {
        _id: string
    }) {
        const secret = config.token.secret
        const expiredAt = moment().add(1, "days").format()
        return jwt.encode({ role: "student", _id: payload._id, expiredAt }, secret)
    }
    async getCheckinToken(payload: {
        cardId: string
        timestamps: string
    }) {
        return jwt.encode(payload, config.token.checkinSecret)
    }
}