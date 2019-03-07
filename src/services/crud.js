import * as Request from 'request-promise-native'

import { environment } from '../environments'

export class CrudApi {
    constructor(subpath) {
        this.subpath = subpath
    }
    baseUrl(path = "") {
        return `${environment.production.host}/api/${environment.production.version}/${this.subpath}/${path}`
    }
    async exec(options) {
        try {
            return await Request(options)
        } catch (err) {

        }
    }
    async getList() {
        const options = {
            uri: this.baseUrl(),
            method: "GET",
            qs: {

            },

        }
        return await this.exec(options)
    }
    async getItem() {

    }
    async delete() {

    }
    async deleteAll() {

    }
    async update() {

    }
    async test() {
        const options = {
            uri: "https://pntravel.herokuapp.com/api/v1/post",
            method: "GET"
        }
        const res = await Request(options)
        console.log("res: ", res)
        return res
    }


}