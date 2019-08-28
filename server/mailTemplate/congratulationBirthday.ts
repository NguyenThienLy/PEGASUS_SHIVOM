import { BaseEmailTemplate } from "./base";
import { utilService } from "../services";

export class CongatulationBirthdayEmail extends BaseEmailTemplate {
    constructor() {
        super("SHIVOM - Chúc mừng sinh nhật")
        this.option = {
            subject: "SHIVOM - Chúc mừng sinh nhật",
            text: `
                Xin chào {{name}}, Hiệp Hoà Yoga chúc mừng sinh nhật bạn, hãy đến trung tâm để nhận được phần quà hấp dẫn
                Trân trọng.
            `,
            html: `
                <p>
                Xin chào {{name}}, Hiệp Hoà Yoga chúc mừng sinh nhật bạn.
                <br>Hãy đến trung tâm để nhận được phần quà hấp dẫn
                Trân trọng.<br>
                Trân trọng.
                </p>
            `
        }
    }

    async buildTemplate(receiver: string[], params: {
        name: string
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