import { BaseReducer } from "./base";

export class SettingReducer extends BaseReducer {
  constructor() {
    super("statisticStudent");
    this.initState = {
      statisticForLineChart: {
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
      fetchLineChartPending: `FETCHLINECHART_${this.name}_PENDING`,
      fetchLineChartSuccess: `FETCHLINECHART_${this.name}_SUCCESS`,
      fetchLineChartError: `FETCHLINECHART_${this.name}_ERROR`,
      fetchPieChartPending: `FETCHPIECHART_${this.name}_PENDING`,
      fetchPieChartSuccess: `FETCHPIECHART_${this.name}_SUCCESS`,
      fetchPieChartError: `FETCHPIECHART_${this.name}_ERROR`
    };
  }
  reducer = (state = this.initState, action) => {
    let itemIndex = -1;
    switch (action.type) {
      // Đang lấy dữ liệu cho line chart
      case this.actions.fetchLineChartPending:
        state = {
          ...state,
          statisticForLineChart: {
            ...state.statisticForLineChart,
            fetching: true
          }
        };

        break;

      // Lấy thành công dữ liệu cho line chart
      case this.actions.fetchLineChartSuccess:
        state = {
          ...state,
          statisticForLineChart: {
            ...state.statisticForLineChart,
            data: action.statisticForLineChart.data,
            fetching: false
          }
        };

        break;

      // Lấy dữ liệu thất bại chọ line chart
      case this.actions.fetchLineChartError:
        state = {
          ...state,
          statisticForLineChart: {
            ...state.statisticForLineChart,
            data: [],
            fetching: true
          }
        };
        break;

      case this.actions.updatePending:
        break;
      case this.actions.updateSuccess:
        itemIndex = state.findIndex(item => {
          return item._id === action.payload._id;
        });
        if (itemIndex !== -1) {
          state[itemIndex] = action.payload;
        }
        break;
      case this.actions.updateError:
        break;
    }
    return state;
  };
}
