import { CrudApi } from "../crud";

export class StatisticStudentApi extends CrudApi {
  constructor() {
    super("statisticStudent");
  }

  async statisticForCalendarChart(
    student,
    course,
    type,
    startTime,
    endTime,
    token
  ) {
    let url = this.baseUrl("statisticForCalendarChart");
    const query = this._serialize({
      student,
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

  async statisticForPieChart(student, course, type, startTime, endTime, token) {
    let url = this.baseUrl("statisticForCalendarChart");
    const query = this._serialize({
      student,
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

  async statisticForListDetail(course, type, startTime, endTime, token) {
    let url = this.baseUrl("statisticForListDetail");
    const query = this._serialize({
      course,
      type,
      startTime,
      endTime
    });
    url += `${query}`;

    console.log("listDetailUrl", url);

    const options = {
      method: "GET",
      headers: _.merge({
        "User-Agent": "Request-Promise",
        "Content-Type": "Application/json",
        "x-token": token
      })
    };
    //console.log("listDetailUrl", url);

    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }
}
