import { CrudApi } from '../crud'

export class AdminApi extends CrudApi {
    constructor() {
        super("admin")
    }
    async statisticLine(startTime, endTime) {
        let url = this.baseUrl("statisticLine");
        const query = this._serialize({
            startTime,
            endTime
        });
        url += `${query}`;
        const options = {
            method: "GET",
            headers: _.merge(
                {
                    "User-Agent": "Request-Promise",
                    "Content-Type": "Application/json",
                    "x-token": token
                }
            ),
            body: JSON.stringify(body)
        };
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res
        }
    }
}