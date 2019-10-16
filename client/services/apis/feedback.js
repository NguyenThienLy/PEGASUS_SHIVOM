import { CrudApi } from '../crud'

export class FeedbackApi extends CrudApi {
    constructor() {
        super("feedback")
    }
    async replyByEmail(feedbackId, content, option) {
        let url = this.baseUrl(`${feedbackId}`);
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
                content
            })
        }
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res
        }
    }
    async updateConfirmFeedbacks(feedbackId, body, option = {}) {
        let url = this.baseUrl(`${feedbackId}/updateConfirmFeedbacks`);
        const query = this._serialize(option.query || {});
        url += `${query}`;
        const options = {
            method: "PUT",
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

        console.log("url", url)

        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res;
        }
    }
}