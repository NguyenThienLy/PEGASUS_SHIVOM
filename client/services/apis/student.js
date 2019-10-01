import { CrudApi } from "../crud";

export class StudentApi extends CrudApi {
  constructor() {
    super("student");
  }
  async getTimeTableByCourse(studentId, courseId, option = {}) {
    let url = this.baseUrl(`${studentId}/timeTable/${courseId}`);
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
  async getTimeTable(studentId, option = {}) {
    let url = this.baseUrl(`${studentId}/timeTable`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "GET",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
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
  async getListClassOfStudent(studentId, option = {}) {
    let url = this.baseUrl(`${studentId}/class`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "GET",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
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
  async searchByPhone(phone, option = {}) {
    let url = this.baseUrl(`search`);
    option.query = option.query || {}
    option.query.phone = phone;
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "GET",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
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
  async checkIn(studentId, option = {}) {
    let url = this.baseUrl(`${studentId}/checkin`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "GET",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
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

  async login(phone, password, option = {}) {
    let url = this.baseUrl(`login`);
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
        phone, password
      })
    }
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res
    }
  }
  async updateCard(studentId, code, option = {}) {
    let url = this.baseUrl(`${studentId}/card`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "POST",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
        },
        option.headers || {}
      ),
      body: JSON.stringify({
        code
      })
    };
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }
  async sendGift(studentId, giftId, amount, option = {}) {
    let url = this.baseUrl(`${studentId}/sendGift`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "POST",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
        },
        option.headers || {}
      ),
      body: JSON.stringify({
        gift: giftId,
        amount
      })
    };
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }
  async getListStudentUpcommingBirthday(option = {}) {
    let url = this.baseUrl(`upcommingBirthday`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "GET",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
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
  async getListStudentUpcommingExpired(option = {}) {
    let url = this.baseUrl(`upcommingExpired`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "GET",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
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
  async enroll(body, option = {}) {
    let url = this.baseUrl(`enroll`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "POST",
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
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }
  async sendMailUpcommingPayFee(courseStudentIds, option = {}) {
    let url = this.baseUrl(`sendMailUpcommingPayFee`);
    const query = this._serialize(option.query || {});
    url += `${query}`;
    const options = {
      method: "POST",
      headers: _.merge(
        {
          "User-Agent": "Request-Promise",
          "Content-Type": "Application/json",
          "x-token": localStorage.getItem("token")
        },
        option.headers || {}
      ),
      body: JSON.stringify({
        courseStudentIds
      })
    };
    const res = await this.exec(url, options);
    if (res.code && res.code === 200) {
      return res;
    } else {
      throw res;
    }
  }
  async statisticForColumnChart(course, startTime, endTime, token) {
    let url = this.baseUrl("statisticForColumnChart");
    const query = this._serialize({
      course,
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
}
