import { BaseAction } from "./base";
import { api } from "../services";

export class StatisticStudentAction extends BaseAction {
  constructor() {
    super("statisticStudent", api.statisticStudent);
  }

  fetchForListDetail = (course, type, startTime, endTime, token) => {
    return dispatch => {
      dispatch({
        type: `FETCHLISTDETAIL_${this.name}_PENDING`
      });
      this.api
        .statisticForListDetail(course, type, startTime, endTime, token)
        .then(res => {
          dispatch({
            type: `FETCHLISTDETAIL_${this.name}_SUCCESS`,
            payload: res.result.object
          });
          return res;
        })
        .catch(error => {
          dispatch({
            type: `FETCHLISTDETAIL_${this.name}_ERROR`,
            payload: error
          });
        });
    };
  };

  fetchForPieChart = (student, course, type, startTime, endTime, token) => {
    return dispatch => {
      dispatch({
        type: `FETCHPIECHART_${this.name}_PENDING`
      });
      this.api
        .statisticForPieChart(student, course, type, startTime, endTime, token)
        .then(res => {
          dispatch({
            type: `FETCHPIECHART_${this.name}_SUCCESS`,
            payload: res.result.object
          });
          return res;
        })
        .catch(error => {
          dispatch({
            type: `FETCHPIECHART_${this.name}_ERROR`,
            payload: error
          });
        });
    };
  };

  fetchForCalendarChart = (
    student,
    course,
    type,
    startTime,
    endTime,
    token
  ) => {
    return dispatch => {
      dispatch({
        type: `FETCHCALENDARCHART_${this.name}_PENDING`
      });
      this.api
        .statisticForCalendarChart(student, course, type, startTime, endTime, token)
        .then(res => {
          dispatch({
            type: `FETCHCALENDARCHART_${this.name}_SUCCESS`,
            payload: res.result.object
          });
          return res;
        })
        .catch(error => {
          dispatch({
            type: `FETCHCALENDARCHART_${this.name}_ERROR`,
            payload: error
          });
        });
    };
  };
}
