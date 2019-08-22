import { CrudService } from '../crud.service'
import { Feedback, FeedbackModel } from '../../models'

export class FeedbackService extends CrudService<typeof Feedback> {
    constructor() {
        super(Feedback);
    }
}