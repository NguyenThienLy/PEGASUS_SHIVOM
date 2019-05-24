import { CrudApi } from '../crud'

export class SearchApi extends CrudApi {
    constructor(){
        super("search")
    }
    async search(params, option = {}) {
        let url = this.baseUrl("search");
        const query = this._serialize(params || {});
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
        };
        const res = await this.exec(url, options);
        return res.result.object
    }
}