import { IEmailConfig } from "./mail.interface";
import * as nodemailer from "nodemailer"
import * as _ from 'lodash'
import { config } from "../../config";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
export class MailService {
    constructor() {
        this.setup({
            host: config.mail.host,
            port: config.mail.port,
            user: config.mail.user,
            pass: config.mail.pass,
            secure: false,
            service: "gmail"
        })
    }
    defaultConfig: IEmailConfig
    setup(option: IEmailConfig) {
        this.defaultConfig = _.merge({}, this.defaultConfig, option)
    }
    getTransporter(option: IEmailConfig) {
        return new Promise((resolve, reject) => {
            if (option.testing) {
                nodemailer.createTestAccount((err, account) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: account.user, // generated ethereal user
                            pass: account.pass  // generated ethereal password
                        }
                    })
                    resolve(transporter)
                })
            } else {
                const transporter = nodemailer.createTransport({
                    service: option.service,
                    host: option.host,
                    port: option.port,
                    secure: option.secure,
                    auth: {
                        user: option.user,
                        pass: option.pass
                    }
                })
                resolve(transporter)
            }
        })
    }
    sendMail(params: {
        transporterOption?: IEmailConfig,
        mailOption: MailOptions
    }) {
        return new Promise(async (resolve, reject) => {
            const option = _.merge({}, this.defaultConfig, params.transporterOption)
            const transporter = await this.getTransporter(option) as any
            transporter.sendMail(params.mailOption, (err: any, info: any) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(info)
                console.log('Message sent: %s', info.messageId);
                if (option.testing) {
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                }
            });
        })
    }

}