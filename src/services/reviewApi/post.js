import 'isomorphic-unfetch'
import { CrudApi } from '../crud'
import * as _ from 'lodash'

export class PostApi extends CrudApi {
    constructor(){
        super("post")
    }
    async getItemBySlug(slug, option = {}) {
        let url = this.baseUrl(`slug/${slug}`);
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
        return res.result.object;
      }
}