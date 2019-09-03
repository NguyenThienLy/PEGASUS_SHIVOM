import { CrudApi } from '../crud'

export class FeedbackApi extends CrudApi {
    constructor() {
        super("feedback")
    }
}