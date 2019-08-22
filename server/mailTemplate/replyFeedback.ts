import { BaseEmailTemplate } from "./base";
import { utilService } from "../services";

export class ReplyFeedbackEmail extends BaseEmailTemplate {
    constructor() {
        super("SHIVOM - Trả lời góp ý")
        this.option = {
            subject: "SHIVOM - Trả lời góp ý của {{name}}",
            text: `
            Xin chào {{name}},    
            Trung tâm xin trả lời góp ý "{{feedbackContent}}" của {{name}},
            {{replyContent}}
            `,
            html: `
            Xin chào {{name}}, 
            <br>   
            Trung tâm xin trả lời góp ý của {{name}}
            <blockquote>"{{feedbackContent}}"</blockquote>
            {{replyContent}}
            <br>
            Trân trọng.
            `
        }
    }

    async buildTemplate(receiver: string[], params: {
        replyContent: string
        name: string
        feedbackContent: string
    }) {
        const templateOption = await super.buildTemplate(receiver, params)
        templateOption.subject = await utilService.parseMessengeWithInfo({
            message: templateOption.subject,
            info: params
        })
        templateOption.text = await utilService.parseMessengeWithInfo({
            message: templateOption.text,
            info: params
        })
        templateOption.html = await utilService.parseMessengeWithInfo({
            message: templateOption.html,
            info: params
        })
        return templateOption
    }
}