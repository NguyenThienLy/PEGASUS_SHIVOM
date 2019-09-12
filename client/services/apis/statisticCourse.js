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
    console.log("Lineurl", url);
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
      //console.log("res", res);
      return res;
    } else {
      throw res;
    }
  }

  async statisticForPieChart(course, type, startTime, endTime, token) {
    let url = this.baseUrl("statisticForPieChart");
    //console.log("url", url);
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
      //console.log("result Api call", res);
      return res;
    } else {
      //console.log("error call api");
      throw res;
    }
  }
}
