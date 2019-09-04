import { CrudApi } from '../crud'

export class RegisCourseApi extends CrudApi {
    constructor() {
        super("regisCourse")
    }
    async enroll(regisCourseId, enrollData, option) {
        let url = this.baseUrl(`${regisCourseId}/enroll`);
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
            body: JSON.stringify(enrollData)
        }
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res
        }
    }
}