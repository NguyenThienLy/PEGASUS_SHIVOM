import { BaseAction } from "./base";
import { api } from "../services";

export class StatisticCourseAction extends BaseAction {
  constructor() {
    super("statisticCourse", api.statisticCourse);
  }

  fetchForLineChart = (course, type, startTime, endTime, token) => {
    // console.log(
    //   "course, type, startTime, endTime, token",
    //   course,
    //   type,
    //   startTime,
    //   endTime,
    //   token
    // );
    return dispatch => {
      dispatch({
        type: `FETCHLINECHART_${this.name}_PENDING`
      });
      this.api
        .statisticForLineChart(course, type, startTime, endTime, token)
        .then(res => {
          dispatch({
            type: `FETCHLINECHART_${this.name}_SUCCESS`,
            payload: res.result.object
          });
          return res;
        })
        .catch(error => {
          dispatch({
            type: `FETCHLINECHART_${this.name}_ERROR`,
            payload: error
          });
        });
    };
  };

  fetchForPieChart = (course, type, startTime, endTime, token) => {
    return dispatch => {
      dispatch({
        type: `FETCHPIECHART_${this.name}_PENDING`
      });
      this.api
        .statisticForPieChart(course, type, startTime, endTime, token)
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

  // fetchForColumChart = (option = {}) => {
  //   return dispatch => {
  //     dispatch(this.fetchPending());
  //     this.api
  //       .statisticForLineChart(option)
  //       .then(res => {
  //         dispatch(this.fetchSuccess(res.results.objects.rows));
  //         return res;
  //       })
  //       .catch(error => {
  //         dispatch(this.fetchError(error));
  //       });
  //   };
  // };
}
