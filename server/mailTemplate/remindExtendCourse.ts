import { BaseEmailTemplate } from "./base";
import { utilService } from "../services";

export class RemindExtendCourseEmail extends BaseEmailTemplate {
    constructor() {
        super("SHIVOM - Nhắc nhở gia hạn thời gian học")
        this.option = {
            subject: "SHIVOM - Nhắc nhở gia hạn thời gian học",
            text: `
                Xin chào {{name}} khoá học {{courseName}} sẽ hết hạn vào ngày {{endDay}}
                Vui lòng gia hạn thời gian học để được tiếp tục học tại trung tâm
            `,
            html: `
                <p>Xin chào {{name}} khoá học {{courseName}} sẽ hết hạn vào ngày {{endDay}}
                Vui lòng gia hạn thời gian học để được tiếp tục học tại trung tâm</p>
            `
        }
    }

    async buildTemplate(receiver: string[], params: {
        name: string
        endDay: string
        courseName: string
    }) {
        const templateOption = await super.buildTemplate(receiver, params)
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