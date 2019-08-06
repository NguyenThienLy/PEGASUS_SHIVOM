import { BaseError } from './error/base'
import { CompanyErrorService } from './error/companyErrorService'
import { CustomerErrorService} from './error/customerErrorService'
import { FirebaseErrorService } from './error/firebaseErrorService'
import { TicketErrorService } from './error/ticketErrorService'
import { RouterErrorService } from './error/routerErrorService'
import { AuthErrorService} from './error/authErrorService'
import { DatabaseErrorService } from './error/databaseErrorService'

export class ErrorService {
    constructor(){
        this.company = new CompanyErrorService()
        this.customer = new CustomerErrorService()
        this.firebase = new FirebaseErrorService()
        this.ticket = new TicketErrorService()
        this.router = new RouterErrorService()
        this.auth = new AuthErrorService()
        this.database = new DatabaseErrorService()
    }
    company: CompanyErrorService
    customer: CustomerErrorService
    firebase: FirebaseErrorService
    ticket: TicketErrorService
    router: RouterErrorService
    auth: AuthErrorService
    database: DatabaseErrorService

}