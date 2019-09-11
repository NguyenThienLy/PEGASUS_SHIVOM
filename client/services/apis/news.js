import { CrudApi } from "../crud";
import * as _ from 'lodash'

export class NewsApi extends CrudApi {
    constructor() {
        super("news");
    }
    async getNewsBySlug(slug, option = { query: {} }) {
        let url = this.baseUrl();
        option.query.filter = { slug: slug }
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
        if (res.code && res.code === 200 && res.results.objects.count === 1) {
            return res.results.objects.rows[0]
        } else {
            throw res
        }
    }
    async setSlider(newsId, sliderData, option) {
        let url = this.baseUrl(`${newsId}/slider`);
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
            body: JSON.stringify(sliderData)
        };
        const res = await this.exec(url, options);
        if (res.code && res.code === 200) {
            return res;
        } else {
            throw res;
        }
    }
    async getItemFromClient(id, option = {}) {
        let url = this.baseUrl(`${id}/client`);
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
        if (res.code && res.code === 200) {
            return res.result.object;
        } else {
            throw res;
        }
    }

    async getNewsFromClientBySlug(slug, option = {}) {
        let url = this.baseUrl(`slug/${slug}`);
        option.query.filter = { slug: slug };
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
        if (res.code && res.code === 200) {
            return res.result.object
        } else {
            throw res;
        }
    }
}
