import * as moment from "moment";

import { BaseAction } from "./base";
import { api } from "../services";

export class StudentAction extends BaseAction {
  constructor() {
    super("student", api.student);
  }

  fetchForColumnChart = (course, startTime, endTime, token) => {
    return dispatch => {
      dispatch({
        type: `FETCHCOLUMNCHART_${this.name}_PENDING`
      });
      this.api
        .statisticForColumnChart(course, startTime, endTime, token)
        .then(res => {
          //console.log("res", res);
          dispatch({
            type: `FETCHCOLUMNCHART_${this.name}_SUCCESS`,
            payload: res.result.object
          });
          return res;
        })
        .catch(error => {
          dispatch({
            type: `FETCHCOLUMNCHART_${this.name}_ERROR`,
            payload: error
          });
        });
    };
  };

  fetchForNewStudents = (option = {}) => {
    return dispatch => {
      dispatch({
        type: `FETCHNEWSTUDENTS_${this.name}_PENDING`
      });
      this.api
        .getList(option)
        .then(res => {
          res.results.objects.rows.forEach(element => {
            element.suport =
              "Nhập học: " + moment(element.createdAt).format("L");
            element.header =
              moment().diff(element.createdAt, "days") + " ngày trước";
          });

          dispatch({
            type: `FETCHNEWSTUDENTS_${this.name}_SUCCESS`,
            payload: res.results.objects.rows
          });
          return res;
        })
        .catch(error => {
          dispatch({
            type: `FETCHNEWSTUDENTS_${this.name}_ERROR`,
            payload: error
          });
        });
    };
  };

  fetchForTopPoint = (option = {}) => {
    return dispatch => {
      dispatch({
        type: `FETCHTOPPOINT_${this.name}_PENDING`
      });
      this.api
        .getList(option)
        .then(res => {
          // Xử lí dữ liệu chuẩn
          let i = 1;
          res.results.objects.rows.forEach(element => {
            element.suport = element.point + " điểm";
            element.header = "top " + i++;
          });

          dispatch({
            type: `FETCHTOPPOINT_${this.name}_SUCCESS`,
            payload: res.results.objects.rows
          });
          return res;
        })
        .catch(error => {
          dispatch({
            type: `FETCHTOPPOINT_${this.name}_ERROR`,
            payload: error
          });
        });
    };
  };

  fetchForUpcommingBirthday = (option = {}) => {
    return dispatch => {
      dispatch({
        type: `FETCHUPCOMMINGBIRTHDAY_${this.name}_PENDING`
      });
      this.api
        .getListStudentUpcommingBirthday(option)
        .then(res => {
          // Xử lí dữ liệu chuẩn
          res.results.objects.rows.forEach(element => {
            let day = moment(element.birthday).add(
              moment().year() - moment(element.birthday).year(),
              "years"
            );
            element.suport =
              "Ngày sinh: " + moment(element.birthday).format("L");
            element.header = day.diff(moment(), "days") + " ngày nữa";
          });

          dispatch({
            type: `FETCHUPCOMMINGBIRTHDAY_${this.name}_SUCCESS`,
            payload: res.results.objects.rows
          });
          return res;
        })
        .catch(error => {
          dispatch({
            type: `FETCHUPCOMMINGBIRTHDAY_${this.name}_ERROR`,
            payload: error
          });
        });
    };
  };
}
