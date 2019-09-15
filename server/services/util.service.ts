import * as _ from 'lodash'
import * as crypto from 'crypto'
import * as Ajv from 'ajv'
import * as AjvError from 'ajv-errors'
import * as AjvKeyWords from 'ajv-keywords'
import * as bcrypt from 'bcryptjs'
import * as moment from 'moment'

const SALT_WORK_FACTOR = 10
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
    async hashPassword(data) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        const hash = await bcrypt.hash(data, salt)
        return hash
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
    generateShortId(length: number) {
        var d = new Date().valueOf();
        var n = d.toString();
        var result = '';
        var p = 0;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        for (var i = length; i > 0; --i) {
            result += ((i & 1) && n.charAt(p) ? n.charAt(p) : chars[Math.floor(Math.random() * chars.length)]);
            if (i & 1) p++;
        };
        return result
    }
    parseDateToWeekMonthYear(dateTime) {
        let week, month, year

        week = moment(dateTime).week()
        month = moment(dateTime).month() + 1
        year = moment(dateTime).year()

        // Nếu đó ngày thuộc tuần của năm sau
        if (week === 1 && month === 12) {
            month = 1
            year++
        }

        return {
            week: week,
            month: month,
            year: year
        }
    }
}