import { BaseReducer } from "./base";

export class StudentReducer extends BaseReducer {
  constructor() {
    super("student");
    this.initState = {
      statisticForColumnChart: {
        fetching: false,
        fetchError: null,
        data: []
      }
    };
    this.actions = {
      fetchColumnChartPending: `FETCHCOLUMNCHART_${this.name}_PENDING`,
      fetchColumnChartSuccess: `FETCHCOLUMNCHART_${this.name}_SUCCESS`,
      fetchColumnChartError: `FETCHCOLUMNCHART_${this.name}_ERROR`
    };
  }
  reducer = (state = this.initState, action) => {
    switch (action.type) {
      // Đang lấy dữ liệu cho column chart
      case this.actions.fetchColumnChartPending:
        return _.merge(
          {},
          {
            statisticForColumnChart: {
              fetching: true,
              fetchError: null,
              data: []
            }
          }
        );

      // Lấy thành công dữ liệu cho column chart
      case this.actions.fetchColumnChartSuccess:
        return _.merge(
          {},
          {
            statisticForColumnChart: {
              data: action.payload,
              fetching: false,
              fetchError: null
            }
          }
        );

      // Lấy dữ liệu thất bại chọ line chart
      case this.actions.fetchColumnChartError:
        return _.merge(
          {},
          {
            statisticForColumnChart: {
              data: [],
              fetching: false,
              fetchError: action.payload
            }
          }
        );
    }

    return state;
  };
}
