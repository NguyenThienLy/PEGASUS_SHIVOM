import * as _ from 'lodash'
import * as crypto from 'crypto'
import * as Ajv from 'ajv'
import * as AjvError from 'ajv-errors'
import * as AjvKeyWords from 'ajv-keywords'

export class UtilService {
    validateJSON(schema: any, json: any = {}) {
        const ajv = new Ajv({ allErrors: true, jsonPointers: true });
        AjvError(ajv, { singleError: true })
        AjvKeyWords(ajv, ['switch'])
        const valid = ajv.validate(schema, json);
        return {
            isValid: valid,
            message: ajv.errorsText()
        }
    }
    async hashParams(info: string) {
        return crypto.createHash('sha256').update(info, 'utf8').digest('hex')
    }
    async parseMessengeWithInfo(params: {
        message: string,
        info: any
    }) {
        let { message, info } = params
        const regex = /({|})/g
        const regex2 = /({{\w+}})|({{\w+(?:\.\w+)+)}}/g
        if (regex.test(message)) {
            const replaceText = message.match(regex2)
            for (var item of replaceText) {
                item = item.replace(regex, '');
                message = message.replace(item, _.get(info, item));
            }
            message = message.replace(regex, '')
        }
        return message
    }
}