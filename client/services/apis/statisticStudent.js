import { CrudApi } from "../crud";

export class StatisticStudentApi extends CrudApi {
  constructor() {
    super("student");
  }

  async statisticForCalendarChart(student, course, type, startTime, endTime) {
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
      }),
      body: JSON.stringify(body)
    };
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }

  async statisticForPieChart(student, course, type, startTime, endTime) {
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
      }),
      body: JSON.stringify(body)
    };
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }

  async statisticForListDetail(student, course, type, startTime, endTime) {
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
      }),
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
