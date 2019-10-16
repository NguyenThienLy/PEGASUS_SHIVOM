import { CrudController } from '../crud.controller'
import { feedbackService, studentService, mailService, ICrudOption, settingService, activityService } from '../../services/index'
import { StudentModel, FeedbackModel } from '../../models';
import { replyFeedbackEmail } from '../../mailTemplate';


export class FeedbackController extends CrudController<typeof feedbackService>{
    constructor() {
        super(feedbackService);
    }
    async create(params: any, option?: ICrudOption) {
        // Cong diem cho hoc vien khi hoc vien gui feedback
        // const settings = await settingService.model.find({}).select("pointConfig")
        // if (settings[0].pointConfig.feedback) {
        studentService.update({ $inc: { point: 1 } }, { filter: { _id: params.student } })
        activityService.create({
            student: params.student,
            point: 1,
            type: "feedback",
            content: "Gửi feedback"
        })
        //}
        // Tao feedback
        return await this.service.create(params, option)
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

    async updateConfirmFeedback(feedbackId: string, params: {
        studentId: string,
        isReply: boolean,
        content: string,
        point: number
    }) {
        const { studentId, isReply, content, point } = params;

        const currUpdate = await this.service.update({
            isReply: isReply
        }, {
            filter: {
                _id: feedbackId
            }
        })
        await studentService.update({
            $inc: { point: point }
        }, {
            filter: {
                _id: studentId
            }
        })
        await activityService.create({
            type: "add_point",
            student: studentId,
            content: content
        })

        return currUpdate
    }
}