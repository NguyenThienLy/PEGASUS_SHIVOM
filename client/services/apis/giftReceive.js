import { CrudApi } from '../crud'

export class GiftReceiveApi extends CrudApi {
    constructor() {
        super("giftReceive")
    }
    async receive(giftReceiveId, option = {}) {
        let url = this.baseUrl(`${giftReceiveId}/receive`);
        const query = this._serialize(option.query || {});
        url += `${query}`;
        const options = {
            method: "POST",
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