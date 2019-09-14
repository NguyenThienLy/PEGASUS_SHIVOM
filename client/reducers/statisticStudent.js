import { BaseReducer } from "./base";

export class StatisticStudentReducer extends BaseReducer {
  constructor() {
    super("statisticStudent");
    this.initState = {
      statisticForListDetail: {
        fetching: false,
        fetchError: null,
        data: []
      },
      statisticForCalendarChart: {
        fetching: false,
        fetchError: null,
        data: []
      },
      statisticForPieChart: {
        fetching: false,
        fetchError: null,
        data: []
      }
    };
    this.actions = {
      fetchListDetailPending: `FETCHLISTDETAIL_${this.name}_PENDING`,
      fetchListDetailSuccess: `FETCHLISTDETAIL_${this.name}_SUCCESS`,
      fetchListDetailError: `FETCHLISTDETAIL_${this.name}_ERROR`,
      fetchCalendarChartPending: `FETCHCALENDARCHART_${this.name}_PENDING`,
      fetchCalendarChartSuccess: `FETCHCALENDARCHART_${this.name}_SUCCESS`,
      fetchCalendarChartError: `FETCHCALENDARCHART_${this.name}_ERROR`,
      fetchPieChartPending: `FETCHPIECHART_${this.name}_PENDING`,
      fetchPieChartSuccess: `FETCHPIECHART_${this.name}_SUCCESS`,
      fetchPieChartError: `FETCHPIECHART_${this.name}_ERROR`
    };
  }
  reducer = (state = this.initState, action) => {
    switch (action.type) {
      // Đang lấy dữ liệu cho list detail
      case this.actions.fetchListDetailPending:
        return _.merge(
          {},
          {
            statisticForListDetail: {
              fetching: true,
              fetchError: null,
              data: []
            },
            statisticForCalendarChart: state.statisticForCalendarChart,
            statisticForPieChart: state.statisticForPieChart
          }
        );

      // Lấy thành công dữ liệu cho list detail
      case this.actions.fetchListDetailSuccess:
        return _.merge(
          {},
          {
            statisticForListDetail: {
              data: action.payload,
              fetching: false,
              fetchError: null
            },
            statisticForCalendarChart: state.statisticForCalendarChart,
            statisticForPieChart: state.statisticForPieChart
          }
        );

      // Lấy dữ liệu thất bại cho list detail
      case this.actions.fetchListDetailError:
        return _.merge(
          {},
          {
            statisticForListDetail: {
              data: [],
              fetching: false,
              fetchError: action.payload
            },
            statisticForCalendarChart: state.statisticForCalendarChart,
            statisticForPieChart: state.statisticForPieChart
          }
        );

      // Đang lấy dữ liệu cho calendar chart
      case this.actions.fetchCalendarChartPending:
        return _.merge(
          {},
          {
            statisticForCalendarChart: {
              fetching: true,
              fetchError: null,
              data: []
            },
            statisticForPieChart: state.statisticForPieChar,
            statisticForListDetail: state.statisticForListDetail
          }
        );

      // Lấy thành công dữ liệu cho calendar chart
      case this.actions.fetchCalendarChartSuccess:
        return _.merge(
          {},
          {
            statisticForCalendarChart: {
              data: action.payload,
              fetching: false,
              fetchError: null
            },
            statisticForPieChart: state.statisticForPieChar,
            statisticForListDetail: state.statisticForListDetail
          }
        );

      // Lấy dữ liệu thất bại cho calendar chart
      case this.actions.fetchCalendarChartError:
        return _.merge(
          {},
          {
            statisticForCalendarChart: {
              data: [],
              fetching: false,
              fetchError: action.payload
            },
            statisticForPieChart: state.statisticForPieChar,
            statisticForListDetail: state.statisticForListDetail
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
              data: []
            },
            statisticForCalendarChart: state.statisticForCalendarChart,
            statisticForListDetail: state.statisticForListDetail
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
            statisticForCalendarChart: state.statisticForCalendarChart,
            statisticForListDetail: state.statisticForListDetail
          }
        );

      // Lấy dữ liệu thất bại cho pie chart
      case this.actions.fetchPieChartError:
        return _.merge(
          {},
          {
            statisticForPieChart: {
              data: [],
              fetching: false,
              fetchError: action.payload
            },
            statisticForCalendarChart: state.statisticForCalendarChart,
            statisticForListDetail: state.statisticForListDetail
          }
        );
    }
    return state;
  };
}
