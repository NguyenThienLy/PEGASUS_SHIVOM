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
    let itemIndex = -1;
    switch (action.type) {
      // Đang lấy dữ liệu cho list detail
      case this.actions.fetchListDetailPending:
        state = {
          ...state,
          statisticListDetail: {
            ...state.statisticForListDetail,
            fetching: true
          }
        };

        break;

      // Lấy thành công dữ liệu cho list detail
      case this.actions.fetchListDetailSuccess:
        state = {
          ...state,
          statisticForListDetail: {
            ...state.statisticForListDetail,
            data: action.statisticForListDetail.data,
            fetching: false
          }
        };

        break;

      // Lấy dữ liệu thất bại cho list detail
      case this.actions.fetchListDetailError:
        state = {
          ...state,
          statisticForListDetail: {
            ...state.statisticForListDetail,
            data: [],
            fetching: true
          }
        };
        break;

      // Đang lấy dữ liệu cho calendar chart
      case this.actions.fetchCalendarChartPending:
        state = {
          ...state,
          statisticCalendarChart: {
            ...state.statisticForCalendarChart,
            fetching: true
          }
        };

        break;

      // Lấy thành công dữ liệu cho calendar chart
      case this.actions.fetchCalendarChartSuccess:
        state = {
          ...state,
          statisticForCalendarChart: {
            ...state.statisticForCalendarChart,
            data: action.statisticForCalendarChart.data,
            fetching: false
          }
        };

        break;

      // Lấy dữ liệu thất bại cho calendar chart
      case this.actions.fetchCalendarChartError:
        state = {
          ...state,
          statisticForCalendarChart: {
            ...state.statisticForCalendarChart,
            data: [],
            fetching: true
          }
        };
        break;

      // Đang lấy dữ liệu cho pie chart
      case this.actions.fetchPieChartPending:
        state = {
          ...state,
          statisticPieChart: {
            ...state.statisticForPieChart,
            fetching: true
          }
        };

        break;

      // Lấy thành công dữ liệu cho calendar chart
      case this.actions.fetchPieChartSuccess:
        state = {
          ...state,
          statisticForPieChart: {
            ...state.statisticForPieChart,
            data: action.statisticForPieChart.data,
            fetching: false
          }
        };

        break;

      // Lấy dữ liệu thất bại cho calendar chart
      case this.actions.fetchPieChartError:
        state = {
          ...state,
          statisticForPieChart: {
            ...state.statisticForPieChart,
            data: [],
            fetching: true
          }
        };

        break;
    }
    return state;
  };
}
