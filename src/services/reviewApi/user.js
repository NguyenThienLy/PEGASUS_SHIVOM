import { CrudApi } from '../crud'

export class UserApi extends CrudApi {
    constructor(){
        super("user")
    }
    async login(token, option = {}) {
        let url = this.baseUrl("login");
        const query = this._serialize(option.query || {});
        url += `${query}`;
        const options = {
            method: "POST",
            headers: _.merge(
                {
                    "User-Agent": "Request-Promise",
                    "Content-Type": "Application/json",
                    "access_token": token
                },
                option.headers || {}
            )
        };
        const res = await this.exec(url, options);
        return res.result.object
    }
}