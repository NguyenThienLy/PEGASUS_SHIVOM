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
            const tokenPayload = await tokenService.decode(token, config.token.secret)
            if (providers.indexOf("admin") !== -1) {
                if (tokenPayload.role === "admin") {
                    const admin: AdminModel = await adminService.getItem({ filter: { _id: tokenPayload._id } })
                    req.authInfo = admin
                } else {
                    throw errorService.auth.permissionDenied()
                }
            } else if (providers.indexOf("student")) {
                if (tokenPayload.role === "student") {
                    const student: StudentModel = await studentService.getItem({ filter: { _id: tokenPayload._id } })
                    req.authInfo = student
                } else {
                    throw errorService.auth.permissionDenied()
                }
            }
            next()
        } catch (err) {
            throw errorService.auth.unauthonized()
        }
    }
}