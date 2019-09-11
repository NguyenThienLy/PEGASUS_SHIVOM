import { BaseAction } from "./base";
import { api } from "../services";

export class StudentAction extends BaseAction {
  constructor() {
    super("student", api.student);
  }

  fetchForColumnChart = (course, startTime, endTime) => {
    return dispatch => {
      dispatch({
        type: `FETCHCOLUMNCHART_${this.name}_PENDING`
      });
      this.api
        .statisticForColumnChart(course, startTime, endTime)
        .then(res => {
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
}
