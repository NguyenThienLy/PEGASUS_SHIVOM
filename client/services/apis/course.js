import { CrudApi } from "../crud";
import * as _ from "lodash";

export class CourseApi extends CrudApi {
  constructor() {
    super("course");
  }
  async getCourseBySlug(slug, option = { query: {} }) {
    let url = this.baseUrl();
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
    if (res.code && res.code === 200 && res.results.objects.count === 1) {
      return res.results.objects.rows[0];
    } else {
      throw res;
    }
  }
  async getListTeacherOfCourse(courseId, option = {}) {
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
    };
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }
  async getTimeTableOfCourse(courseId, option = {}) {
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
    };
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }
  async getAllTimeTable(option = {}) {
    let url = this.baseUrl(`timeTable`);
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
      return res;
    } else {
      throw res;
    }
  }
  //   async getAllInfoOfCourse(courseId) {
  //     let url = this.baseUrl(`getAllInfoOfCourse`);
  //     const query = this._serialize({
  //       courseId
  //     });
  //     url += `${query}`;
  //     const options = {
  //       method: "GET",
  //       headers: _.merge(
  //         {
  //           "User-Agent": "Request-Promise",
  //           "Content-Type": "Application/json"
  //         },
  //         option.headers || {}
  //       )
  //     };
  //     const res = await this.exec(url, options);
  //     if (res.code && res.code === 200) {
  //       return res;
  //     } else {
  //       throw res;
  //     }
  //   }
}
