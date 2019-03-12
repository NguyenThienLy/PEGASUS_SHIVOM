import 'isomorphic-unfetch' 
import { environment } from '../environments'
import * as _ from 'lodash'

import { URL, URLSearchParams } from 'url'

export class CrudApi {
    constructor(subpath) {
        this.subpath = subpath
    }
    _paserQuery(query = {}) {
        let parsedQuery = _.merge({}, query)
        if (query.filter) {
            parsedQuery.filter = JSON.stringify(query.filter);
        }
        if (query.order) {
            parsedQuery.order = JSON.stringify(query.order);
        }
        if (query.scopes) {
            parsedQuery.scopes = JSON.stringify(query.scopes);
        }
        if (query.fields) {
            parsedQuery.fields = JSON.stringify(query.fields);
        }
        if (query.items) {
            parsedQuery.items = JSON.stringify(query.items);
        }
        if (query.populates) {
            parsedQuery.populates = JSON.stringify(query.populates)
        }
        if(query.limit) {
            parsedQuery.limit = JSON.stringify(query.limit)
        }
        if(query.offset){
            parsedQuery.offset = JSON.stringify(query.offset)
        }
        return parsedQuery;
    }
    baseUrl(path = "") {
        //return `${environment.production.host}/api/${environment.production.version}/${this.subpath}/${path}`
        return "https://pntravel.herokuapp.com/api/v1/post"
    }
    async exec(url, options) {
        try {
            return await fetch(url, options).then(result => { return result.json() })
        } catch (err) {
            console.log("Request err: ", err)
        }
    }
    async getList(option = {}) {
        const url = new URL(this.baseUrl())
        url.search = new URLSearchParams(this._paserQuery(option.query))
        const options = {
            method: "GET",
            headers: _.merge({
                'User-Agent': 'Request-Promise',
                'Content-Type':"Application/json"
            }, option.headers)
        }
        return await this.exec(url.href, options)
    }
    async getItem(id, option = {}) {
        const url = new URL(this.baseUrl(id))
        url.search = new URLSearchParams(this._paserQuery(option.query))
        const options = {
            method: "GET",
            headers: _.merge({
                'User-Agent': 'Request-Promise',
                'Content-Type':"Application/json"
            }, option.headers)
        }
        return await this.exec(url.href, options)
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