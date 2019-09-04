import { CrudApi } from '../crud'

export class ClassApi extends CrudApi {
    constructor() {
        super("class")
    }
    async deleteTimeTableItem(classId, timeTableId, option) {
        let url = this.baseUrl(`${classId}/timeTable/${timeTableId}`);
        const query = this._serialize(option.query || {});
        url += `${query}`;
        const options = {
            method: "DELETE",
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
    async addTimeTableItem(classId, timeTableData, option) {
        let url = this.baseUrl(`${classId}/timeTable`);
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
            body: JSON.stringify(timeTableData)
        }
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res
        }
    }
    async getTimeTable(classId, option) {
        let url = this.baseUrl(`${classId}/timeTable`);
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
    async changeStatus(classId, status, option) {
        let url = this.baseUrl(`${classId}/status`);
        const query = this._serialize(option.query || {});
        url += `${query}`;
        const options = {
            method: "PUT",
            headers: _.merge(
                {
                    "User-Agent": "Request-Promise",
                    "Content-Type": "Application/json"
                },
                option.headers || {}
            ),
            body: JSON.stringify({
                status
            })
        }
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res
        }
    }
    async getListClassOfTeacher(teacherId, option) {
        let url = this.baseUrl();
        option.query.filter = { teacher: teacherId }
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