import { BaseReducer } from "./base";

export class StatisticCourseReducer extends BaseReducer {
  constructor() {
    super("statisticCourse");
    this.initState = {
      statisticForLineChart: {
        fetching: false,
        fetchError: null,
        data: []
      },
      statisticForPieChart: {
        fetching: false,
        fetchError: null,
        data: null
      }
    };
    this.actions = {
      fetchLineChartPending: `FETCHLINECHART_${this.name}_PENDING`,
      fetchLineChartSuccess: `FETCHLINECHART_${this.name}_SUCCESS`,
      fetchLineChartError: `FETCHLINECHART_${this.name}_ERROR`,
      fetchPieChartPending: `FETCHPIECHART_${this.name}_PENDING`,
      fetchPieChartSuccess: `FETCHPIECHART_${this.name}_SUCCESS`,
      fetchPieChartError: `FETCHPIECHART_${this.name}_ERROR`
    };
  }
  reducer = (state = this.initState, action) => {
    switch (action.type) {
      // Đang lấy dữ liệu cho line chart
      case this.actions.fetchLineChartPending:
        return _.merge(
          {},
          {
            statisticForLineChart: {
              fetching: true,
              fetchError: null,
              data: []
            },
            statisticForPieChart: state.statisticForLineChart
          }
        );

      // Lấy thành công dữ liệu cho line chart
      case this.actions.fetchLineChartSuccess:
        return _.merge(
          {},
          {
            statisticForLineChart: {
              data: action.payload,
              fetching: false,
              fetchError: null
            },
            statisticForPieChart: state.statisticForPieChart
          }
        );

      // Lấy dữ liệu thất bại chọ line chart
      case this.actions.fetchLineChartError:
        return _.merge(
          {},
          {
            statisticForLineChart: {
              data: [],
              fetching: false,
              fetchError: action.payload
            },
            statisticForPieChart: state.statisticForPieChart
          }
        );

      // Đang lấy dữ liệu cho pie chart
      case this.actions.fetchPieChartPending:
        return _.merge(
          {},
          {
            statisticForPieChart: {
              fetching: true,
              fetchError: null,
              data: null
            },
            statisticForLineChart: state.statisticForLineChart
          }
        );

      // Lấy thành công dữ liệu cho pie chart
      case this.actions.fetchPieChartSuccess:
        return _.merge(
          {},
          {
            statisticForPieChart: {
              data: action.payload,
              fetching: false,
              fetchError: null
            },
            statisticForLineChart: state.statisticForLineChart
          }
        );

      // Lấy dữ liệu thất bại chọ pie chart
      case this.actions.fetchPieChartError:
        return _.merge(
          {},
          {
            statisticForPieChart: {
              data: null,
              fetching: false,
              fetchError: action.payload
            },
            statisticForLineChart: state.statisticForLineChart
          }
        );
    }

    return state;
  };
}
