import { CrudApi } from "../crud";
import * as _ from "lodash";

export class StatisticCourseApi extends CrudApi {
  constructor() {
    super("statisticCourse");
  }

  async statisticForLineChart(course, type, startTime, endTime) {
    let url = this.baseUrl("statisticForLineChart");
    const query = this._serialize({
      course,
      type,
      startTime,
      endTime
    });
    url += `${query}`;
    //console.log("url", url);
    const options = {
      method: "GET",
      headers: _.merge({
        "User-Agent": "Request-Promise",
        "Content-Type": "Application/json",
        "x-token":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
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

  async statisticForPieChart(course, type, startTime, endTime) {
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
        "x-token":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
      })
    };

    //console.log("url", url);
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
