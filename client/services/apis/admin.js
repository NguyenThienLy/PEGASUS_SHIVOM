import { CrudApi } from "../crud";

export class AdminApi extends CrudApi {
  constructor() {
    super("admin");
  }
  async login(username, password, option = {}) {
    let url = this.baseUrl(`login`);
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
      ),
      body: JSON.stringify({
        username, password
      })
    }
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res
    }
  }
}
