import { BaseReducer } from "./base";

export class StudentReducer extends BaseReducer {
  constructor() {
    super("student");
    this.initState = {
      items: [],
      fetching: false,
      fetchError: null,
      updating: false,
      updateError: null,
      isAddSuccess: false,
      adding: false,
      isAddError: false,
      addError: null,
      deleting: false,
      deleteError: null,
      itemsNewStudents: {
        fetching: false,
        fetchError: null,
        data: []
      },
      itemsTopPoint: {
        fetching: false,
        fetchError: null,
        data: []
      },
      itemsUpcommingBirthday: {
        fetching: false,
        fetchError: null,
        data: []
      },
      statisticForColumnChart: {
        fetching: false,
        fetchError: null,
        data: []
      }
    };
    this.customActions = {
      fetchColumnChartPending: `FETCHCOLUMNCHART_${this.name}_PENDING`,
      fetchColumnChartSuccess: `FETCHCOLUMNCHART_${this.name}_SUCCESS`,
      fetchColumnChartError: `FETCHCOLUMNCHART_${this.name}_ERROR`,

      fetchNewStudentsPending: `FETCHNEWSTUDENTS_${this.name}_PENDING`,
      fetchNewStudentsSuccess: `FETCHNEWSTUDENTS_${this.name}_SUCCESS`,
      fetchNewStudentsError: `FETCHNEWSTUDENTS_${this.name}_ERROR`,

      fetchTopPointPending: `FETCHTOPPOINT_${this.name}_PENDING`,
      fetchTopPointSuccess: `FETCHTOPPOINT_${this.name}_SUCCESS`,
      fetchTopPointError: `FETCHTOPPOINT_${this.name}_ERROR`,

      fetchUpcommingBirthdayPending: `FETCHUPCOMMINGBIRTHDAY_${this.name}_PENDING`,
      fetchUpcommingBirthdaySuccess: `FETCHUPCOMMINGBIRTHDAY_${this.name}_SUCCESS`,
      fetchUpcommingBirthdayError: `FETCHUPCOMMINGBIRTHDAY_${this.name}_ERROR`
    };
  }
  customReducer = (state = this.initState, action) => {
    switch (action.type) {
      // Đang lấy dữ liệu cho column chart
      case this.customActions.fetchColumnChartPending:
        return _.merge(
          {},
          {
            statisticForColumnChart: {
              fetching: true,
              fetchError: null,
              data: []
            },
            itemsNewStudents: state.itemsNewStudents,
            itemsTopPoint: state.itemsTopPoint,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Lấy thành công dữ liệu cho column chart
      case this.customActions.fetchColumnChartSuccess:
        return _.merge(
          {},
          {
            statisticForColumnChart: {
              data: action.payload,
              fetching: false,
              fetchError: null
            },
            itemsNewStudents: state.itemsNewStudents,
            itemsTopPoint: state.itemsTopPoint,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Lấy dữ liệu thất bại chọ column chart
      case this.customActions.fetchColumnChartError:
        return _.merge(
          {},
          {
            statisticForColumnChart: {
              data: [],
              fetching: false,
              fetchError: action.payload
            },
            itemsNewStudents: state.itemsNewStudents,
            itemsTopPoint: state.itemsTopPoint,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Đang lấy dữ liệu cho new students
      case this.customActions.fetchNewStudentsPending:
        return _.merge(
          {},
          {
            itemsNewStudents: {
              fetching: true,
              fetchError: null,
              data: []
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsTopPoint: state.itemsTopPoint,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Lấy thành công dữ liệu cho new student
      case this.customActions.fetchNewStudentsSuccess:
        return _.merge(
          {},
          {
            itemsNewStudents: {
              data: action.payload,
              fetching: false,
              fetchError: null
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsTopPoint: state.itemsTopPoint,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Lấy dữ liệu thất bại cho new students
      case this.customActions.fetchNewStudentsError:
        return _.merge(
          {},
          {
            itemsNewStudents: {
              data: [],
              fetching: false,
              fetchError: action.payload
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsTopPoint: state.itemsTopPoint,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Đang lấy dữ liệu cho top point
      case this.customActions.fetchTopPointPending:
        return _.merge(
          {},
          {
            itemsTopPoint: {
              fetching: true,
              fetchError: null,
              data: []
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsNewStudents: state.itemsNewStudents,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Lấy thành công dữ liệu cho top point
      case this.customActions.fetchTopPointSuccess:
        //console.log("toppoint Success");
        return _.merge(
          {},
          {
            itemsTopPoint: {
              data: action.payload,
              fetching: false,
              fetchError: null
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsNewStudents: state.itemsNewStudents,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Lấy dữ liệu thất bại cho top point
      case this.customActions.fetchTopPointError:
        return _.merge(
          {},
          {
            itemsTopPoint: {
              data: [],
              fetching: false,
              fetchError: action.payload
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsNewStudents: state.itemsNewStudents,
            itemsUpcommingBirthday: state.itemsUpcommingBirthday
          }
        );

      // Đang lấy dữ liệu cho upcomming birthday
      case this.customActions.fetchUpcommingBirthdayPending:
        return _.merge(
          {},
          {
            itemsUpcommingBirthday: {
              fetching: true,
              fetchError: null,
              data: []
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsNewStudents: state.itemsNewStudents,
            itemsTopPoint: state.itemsTopPoint
          }
        );

      // Lấy thành công dữ liệu cho upcomming birthday
      case this.customActions.fetchUpcommingBirthdaySuccess:
        return _.merge(
          {},
          {
            itemsUpcommingBirthday: {
              data: action.payload,
              fetching: false,
              fetchError: null
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsNewStudents: state.itemsNewStudents,
            itemsTopPoint: state.itemsTopPoint
          }
        );

      // Lấy dữ liệu thất bại cho upcomming birthday
      case this.customActions.fetchUpcommingBirthdayError:
        return _.merge(
          {},
          {
            itemsUpcommingBirthday: {
              data: [],
              fetching: false,
              fetchError: action.payload
            },
            statisticForColumnChart: state.statisticForColumnChart,
            itemsNewStudents: state.itemsNewStudents,
            itemsTopPoint: state.itemsTopPoint
          }
        );
    }

    return state;
  };
}
