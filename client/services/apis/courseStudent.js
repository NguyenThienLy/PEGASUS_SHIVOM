import { CrudApi } from '../crud'

export class CourseStudentApi extends CrudApi {
    constructor() {
        super("courseStudent")
    }
    async extendTimeCourse(courseStudentId, body, option = { query: {} }) {
        let url = this.baseUrl(`${courseStudentId}/extend`);
        const query = this._serialize(option.query || {});
        url += `${query}`;
        const options = {
            method: "POST",
            headers: _.merge(
                {
                    "User-Agent": "Request-Promise",
                    "Content-Type": "Application/json",
                    "x-token": localStorage.getItem("token")
                },
                option.headers || {}
            ),
            body: JSON.stringify(body)
        };
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res;
        }
    }
}