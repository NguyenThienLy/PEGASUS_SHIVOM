import { CrudController } from '../crud.controller'
import { feedbackService, studentService, mailService } from '../../services/index'
import { StudentModel, FeedbackModel } from '../../models';
import { replyFeedbackEmail } from '../../mailTemplate';


export class FeedbackController extends CrudController<typeof feedbackService>{
    constructor() {
        super(feedbackService);
    }
    async replyFeedback(feedbackId: string, params: {
        content: string
    }) {
        const feedback: FeedbackModel = await this.service.getItem({
            filter: { _id: feedbackId },
            populates: ["student"]
        })
        const replyMailTemplate = await replyFeedbackEmail.buildTemplate([(feedback.student as StudentModel).email], {
            replyContent: params.content,
            feedbackContent: feedback.content,
            name: `${(feedback.student as StudentModel).firstName} ${(feedback.student as StudentModel).lastName}`
        })
        await mailService.sendMail({
            mailOption: replyMailTemplate
        })
        await feedback.update({
            isReply: true,
            repliedAt: new Date,
            replyContent: params.content
        }).exec()
        return {
            message: "Trả lời thành công"
        }
    }
}