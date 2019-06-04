import { CrudApi } from '../crud'
import * as _ from 'lodash'

export class BookCategoryApi extends CrudApi {
    constructor() {
        super("bookCategory")
    }
    async getPosts(id, option = {}) {
        let url = this.baseUrl(`${id}/posts`);
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
        };
        const res = await this.exec(url, options);
        return res.results.objects.rows;
    }
}