import { CrudApi } from '../crud'

export class NewCategoryApi extends CrudApi {
    constructor() {
        super("newCategory")
    }
    async getCountNews(option = {}) {
        let url = this.baseUrl(`countNews`);
        const query = this._serialize(option.query || {});
        url += `${query}`;
        const options = {
            method: "GET",
            headers: _.merge(
                {
                    "User-Agent": "Request-Promise",
                    "Content-Type": "Application/json"
                },
                option.headers || {}
            )
        }
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res
        }
    }
    async getCountNewsOfACategory(newCategoryId, option = {}) {
        let url = this.baseUrl(`${newCategoryId}/countNews`);
        const query = this._serialize(option.query || {});
        url += `${query}`;
        const options = {
            method: "GET",
            headers: _.merge(
                {
                    "User-Agent": "Request-Promise",
                    "Content-Type": "Application/json"
                },
                option.headers || {}
            )
        }
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res
        }
    }
}