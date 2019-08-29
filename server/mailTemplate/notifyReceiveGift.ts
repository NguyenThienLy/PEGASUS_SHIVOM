import { BaseEmailTemplate } from "./base";
import { utilService } from "../services";

export class NotifyRececeiveGiftEmail extends BaseEmailTemplate {
    constructor() {
        super("SHIVOM gửi quà cho bạn")
        this.option = {
            subject: "SHIVOM gửi quà cho bạn",
            text: `
            Xin chào {{name}} Hiệp Hoà Yoga xin tặng bạn {{amount}} phần quà {{giftName}}<br>
            Bạn hãy đến tại trung tâm để nhận phần quà này
            Trân trọng.
            `,
            html: `
                <p>
                Xin chào {{name}} Hiệp Hoà Yoga xin tặng bạn {{amount}} phần quà {{giftName}}<br>
                Bạn hãy đến tại trung tâm để nhận phần quà này
                Trân trọng.
                </p>
            `
        }
    }

    async buildTemplate(receiver: string[], params: {
        name: string
        giftName: string
        amount: number
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