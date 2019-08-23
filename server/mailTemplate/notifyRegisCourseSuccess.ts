import { BaseEmailTemplate } from "./base";
import { utilService } from "../services";

export class NotifyRegisCourseSuccessEmail extends BaseEmailTemplate {
    constructor() {
        super("SHIVOM - Đăng ký khoá học thành công")
        this.option = {
            subject: "SHIVOM - Đăng ký khoá học thành công",
            text: `
                Xin chào {{name}} yêu cầu đăng ký khoá học {{courseName}} đã thành công
                Ngày học của bạn bắt đầu từ ngày {{startDay}} đến ngày {{endDay}}
                Trân trọng.
            `,
            html: `
                <p>
                Xin chào {{name}} yêu cầu đăng ký khoá học {{courseName}} đã thành công<br>
                Ngày học của bạn bắt đầu từ ngày {{startDay}} đến ngày {{endDay}}<br>
                Trân trọng.
                </p>
            `
        }
    }

    async buildTemplate(receiver: string[], params: {
        name: string
        startDay: string
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