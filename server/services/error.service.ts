import { BaseError } from './error/base'
import { StudentErrorService } from './error/studentErrorService'
import { CustomerErrorService } from './error/customerErrorService'
import { FirebaseErrorService } from './error/firebaseErrorService'
import { TicketErrorService } from './error/ticketErrorService'
import { RouterErrorService } from './error/routerErrorService'
import { AuthErrorService } from './error/authErrorService'
import { DatabaseErrorService } from './error/databaseErrorService'
import { GiftErrorService } from './error/giftErrorService'
import { GiftReceiveErrorService } from './error/giftReceiveErrorService'

export class ErrorService {
    constructor() {
        this.student = new StudentErrorService()
        this.customer = new CustomerErrorService()
        this.firebase = new FirebaseErrorService()
        this.ticket = new TicketErrorService()
        this.router = new RouterErrorService()
        this.auth = new AuthErrorService()
        this.database = new DatabaseErrorService()
        this.gift = new GiftErrorService()
        this.giftReceive = new GiftReceiveErrorService()
    }
    student: StudentErrorService
    customer: CustomerErrorService
    firebase: FirebaseErrorService
    ticket: TicketErrorService
    router: RouterErrorService
    auth: AuthErrorService
    database: DatabaseErrorService
    gift: GiftErrorService
    giftReceive: GiftReceiveErrorService

}