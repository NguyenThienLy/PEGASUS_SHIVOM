import { CrudApi } from "../crud";
import * as _ from "lodash";

export class StatisticCourseApi extends CrudApi {
  constructor() {
    super("statisticCourse");
  }

  async statisticForLineChart(course, type, startTime, endTime, token) {
    let url = this.baseUrl("statisticForLineChart");
    const query = this._serialize({
      course,
      type,
      startTime,
      endTime
    });
    url += `${query}`;

    const options = {
      method: "GET",
      headers: _.merge({
        "User-Agent": "Request-Promise",
        "Content-Type": "Application/json",
        "x-token": token
      })
    };
    const res = await this.exec(url, options);
    //console.log("lineDetailUrl", url);

    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }

  async statisticForPieChart(course, type, startTime, endTime, token) {
    let url = this.baseUrl("statisticForPieChart");
    const query = this._serialize({
      course,
      type,
      startTime,
      endTime
    });
    url += `${query}`;
    const options = {
      method: "GET",
      headers: _.merge({
        "User-Agent": "Request-Promise",
        "Content-Type": "Application/json",
        "x-token": token
      })
    };
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }
}
