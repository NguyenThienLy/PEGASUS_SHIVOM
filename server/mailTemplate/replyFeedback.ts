import { BaseEmailTemplate } from "./base";

export class ReplyFeedbackEmail extends BaseEmailTemplate {
    constructor() {
        super("SHIVOM - Trả lời phản hồi")
        this.option = {
            subject: "SHIVOM - Trả lời phản hồi",
            text: `
                Xin chào đây là test
            `,
            html: `
                <p>Xin chào đây là test</p>
            `
        }
    }

    async buildTemplate(receiver: string[], params: {

    }) {
        const templateOption = await super.buildTemplate(receiver, params)

        return templateOption
    }
}