import * as express from 'express'
import { Request, Response } from '../routers/base'
import { errorService, tokenService, adminService, studentService } from '../services'
import { BaseMiddleware } from './baseMiddleware'
import { config } from '../config';
import { AdminModel, StudentModel } from '../models';

export class AuthInfoMiddleware extends BaseMiddleware {

    async use(req: Request, res: Response, next: express.NextFunction, providers: string[]) {
        try {
            const token = req.headers["x-token"]
            if (!token) throw errorService.auth.unauthonized()
            const tokenPayload = await tokenService.decode(token, config.token.secret)
            if (providers.indexOf(tokenPayload.role) !== -1 && tokenPayload.role === "admin") {
                const admin: AdminModel = await adminService.getItem({ filter: { _id: tokenPayload._id } })
                req.authInfo = { admin }
            }
            else if (providers.indexOf(tokenPayload.role) !== -1 && tokenPayload.role === "student") {
                const student: StudentModel = await studentService.getItem({ filter: { _id: tokenPayload._id } })
                req.authInfo = { student }
            }
            else {
                throw errorService.auth.permissionDenied()
            }
            next()
        } catch (err) {
            throw errorService.auth.unauthonized()
        }
    }
}