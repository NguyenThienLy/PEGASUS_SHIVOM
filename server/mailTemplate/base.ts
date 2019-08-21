import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { config } from "../config";
import * as _ from 'lodash'
export class BaseEmailTemplate {
    constructor(name: string) {
        this.name = name
    }
    name: string
    option: MailOptions = {
        from: `"${this.name}" <${config.mail.user}>`, // sender address
    }
    async buildTemplate(receivers: string[], params: any) {
        const templateOption = _.merge({}, this.option)
        templateOption.to = receivers.join(",")
        return templateOption
    }
}