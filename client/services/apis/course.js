import { CrudApi } from '../crud'

export class CourseApi extends CrudApi {
    constructor() {
        super("course")
    }
    async getListTeacherOfCourse(courseId, option) {
        let url = this.baseUrl(`${courseId}/teacher`);
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
    async getTimeTableOfCourse(courseId, option) {
        let url = this.baseUrl(`${courseId}/timeTable`);
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
    async getTimeTableOfCourse(courseId, option) {
        let url = this.baseUrl(`${courseId}/timeTable`);
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