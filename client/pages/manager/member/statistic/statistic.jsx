import * as React from 'react';
import { api } from '../../../../services'
import * as moment from 'moment';
import {
  NumberAdmin,
  PieChart,
  CalendarChart,
  Table,
  CustomSelect,
  ColumnChart,
  LoadingSmall
} from '../../../../components';

import './statistic.scss';

export class StatisticMember extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      member: {
        isFetching: false,
        isEmpty: true,
        data: null
      },
      startTime: {
        data: moment().startOf('year').format("DD/MM/YYYY")
      },
      endTime: {
        data: moment().endOf('year').format("DD/MM/YYYY")
      },
      // modals: {
      //   createPackage: false
      // },
      numberAdmins: {
        isFetching: false,
        isEmpty: true,
        data: {
          onTime: {
            icon: '<i className="fas fa-id-card-alt"></i>',
            about: 'Đi đúng giờ',
            quantity: 0,
            colorIcon: 'rgba(75, 192, 192, 0.6)'
          },
          late: {
            icon: '<i className="fas fa-id-card-alt"></i>',
            about: 'Đi trễ',
            quantity: 0,
            colorIcon: 'rgba(255, 206, 86, 0.6)'
          },
          absent: {
            icon: '<i className="fas fa-id-card-alt"></i>',
            about: 'Vắng',
            quantity: 0,
            colorIcon: 'rgba(255, 99, 132, 0.6)'
          },
          redundant: {
            icon: '<i className="fas fa-id-card-alt"></i>',
            about: 'Đi thừa',
            quantity: 0,
            colorIcon: 'rgba(153, 102, 255, 0.6)'
          }
        }
      },
      customSelectCourse: {
        placeholder: 'Chọn khóa học...',
        options: ['Yoga cho người cao tuổi', 'Yoga cộng đồng']
      },
      // tableDetails: {
      //   isFetching: false,
      //   isEmpty: true,
      //   data: {
      //     absent: {
      //       nameTable: 'Danh sách học viên vắng học',
      //       data: null,
      //       formatKey: "absents"
      //     },
      //     late: {
      //       nameTable: 'Danh sách học viên trễ giờ',
      //       data: null,
      //       formatKey: "lates"
      //     },
      //     onTime: {
      //       nameTable: 'Danh sách học viên đúng giờ',
      //       data: null,
      //       formatKey: "onTimes"
      //     },
      //     redundant: {
      //       nameTable: 'Danh sách học viên đi thừa',
      //       data: null,
      //       formatKey: "redundants"
      //     }
      //   }
      // },
      pieChartData: {
        timeType: null,
        labels: null,
        isEmpty: true,
        isFetching: false,
        datasets: [
          {
            data: null,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ]
          }
        ]
      },
      calendarChartData: {
        timeType: null,
        labels: null,
        isEmpty: true,
        isFetching: false,
        datasets: []
      },
      filterByTimeType: {
        placeholder: 'Theo tuần',
        options: ['Theo tuần', 'Theo tháng', 'Theo năm'],
        values: ['week', 'month', 'year']
      }
    }

    this.filterByTimeType = this.filterByTimeType.bind(this);
    this.changeStartTime = this.changeStartTime.bind(this);
    this.changeEndTime = this.changeEndTime.bind(this);
  }

  fetchData = async (startTime, endTime, timeType) => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M';

    const newMember = this.state.member;
    const timeTypeVi = timeType === "week" ? "tuần" : (timeType === "month" ? "tháng" : (timeType === "year" ? "năm" : "thời gian thực"));

    newMember.data = this.props.students.items.find(student => {
      return student._id === this.props.params.studentId;
    });

    if (!newMember.data) {
      const res = await api.student.getItem(this.props.params.studentId);
      newMember.data = res.result.object;
    }

    newMember.isFetching = false;
    newMember.isEmpty = false;

    this.setState({ member: newMember });

    api.statisticStudent
      .statisticForCalendarChart(this.props.params.studentId,
        this.props.params.courseId, timeType, `${startTime}Z`, `${endTime}Z`, token)
      .then(res => {
        const newCalendarChartData = this.state.calendarChartData;
        newCalendarChartData.datasets = [];

        newCalendarChartData.datasets.push([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]);

        res.result.object.data.forEach(element => {
          var date = moment(element[0]);

          newCalendarChartData.datasets.push([new Date(date.year(), date.month(), date.day()), element[1]])
        });

        newCalendarChartData.timeType = timeTypeVi;
        newCalendarChartData.isEmpty = false;
        newCalendarChartData.isFetching = false;

        this.setState({
          calendarChartData: newCalendarChartData
        });

      }).catch(error => {
        const newCalendarChartData = this.state.calendarChartData;

        newCalendarChartData.timeType = timeTypeVi;
        newCalendarChartData.isEmpty = true;
        newCalendarChartData.isFetching = false;

        this.setState({
          calendarChartData: newCalendarChartData
        });
      })

    api.statisticStudent
      .statisticForPieChart(this.props.params.studentId,
        this.props.params.courseId, timeType, `${startTime}Z`, `${endTime}Z`, token)
      .then(res => {
        const newNumberAdmins = this.state.numberAdmins;
        const newPieChartData = this.state.pieChartData;

        // Gán số lượng loại chuyên cần cho component admin
        newNumberAdmins.data.onTime.quantity = res.result.object.totalOnTime;
        newNumberAdmins.data.late.quantity = res.result.object.totalLate;
        newNumberAdmins.data.absent.quantity = res.result.object.totalAbsent;
        newNumberAdmins.data.redundant.quantity = res.result.object.totalRedundant;

        // Thống kê trên biểu đồ tròn
        newPieChartData.datasets[0].data = res.result.object.data;
        newPieChartData.labels = res.result.object.labels;
        newPieChartData.timeType = timeTypeVi;
        newPieChartData.isEmpty = res.result.object.isEmpty;

        newNumberAdmins.isEmpty = newPieChartData.isEmpty = res.result.object.isEmpty;
        newNumberAdmins.isFetching = newPieChartData.isFetching = false;

        this.setState({
          numberAdmins: newNumberAdmins,
          pieChartData: newPieChartData
        });

      }).catch(error => {
        const newNumberAdmins = this.state.numberAdmins;
        const newPieChartData = this.state.pieChartData;

        newNumberAdmins.isEmpty = newPieChartData.isEmpty = true;
        newNumberAdmins.isFetching = newPieChartData.isFetching = false;

        this.setState({
          numberAdmins: newNumberAdmins,
          pieChartData: newPieChartData
        });
      })
  };

  filterByTimeType(timeType) {
    const startTime = moment(this.refs.startTime.value.split("/").reverse().join("/")).startOf('dates').format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(this.refs.endTime.value.split("/").reverse().join("/")).endOf('dates').format('YYYY-MM-DD HH:mm:ss');

    this.changeIsFetching(true);
    this.fetchData(startTime, endTime, timeType);
  }

  changeStartTime() {
    const newStartTime = this.state.startTime;
    newStartTime.data = this.refs.startTime.value

    this.setState({ startTime: newStartTime });
  }

  changeEndTime() {
    const newEndTime = this.state.endTime;
    newEndTime.data = this.refs.endTime.value

    this.setState({ endTime: newEndTime });
  }

  changeIsFetching(isFetching) {
    const newCalendarChartData = this.state.calendarChartData;
    const newPieChartData = this.state.pieChartData;
    const newNumberAdmins = this.state.numberAdmins;
    const newMember = this.state.member;

    newCalendarChartData.isFetching = isFetching;
    newPieChartData.isFetching = isFetching;
    newNumberAdmins.isFetching = isFetching;
    newMember.isFetching = isFetching;

    this.setState({
      calendarChartData: newCalendarChartData,
      pieChartData: newPieChartData,
      numberAdmins: newNumberAdmins,
      member: newMember
    });
  }

  handleScroll = () => { };
  componentWillUnmount() { }

  componentDidMount() {
    this.changeIsFetching(true);

    this.fetchData(
      moment()
        .startOf('year')
        .format('YYYY-MM-DD HH:mm:ss'),
      moment()
        .endOf('year')
        .format('YYYY-MM-DD HH:mm:ss'),
      'week'
    );

    // var heightOfHeader = $(
    //     '.member-statistics .member-statistics__header .headerAdmin__wrapper'
    // ).height();
    // $('.member-statistics .member-statistics__body').css(
    //     'margin-top',
    //     heightOfHeader + 'px'
    // );

    $(
      '.member-statistics__body__card__content__chart__filter__form__input'
    ).datetimepicker({
      format: 'd/m/Y',
      timepicker: false,
      mask: false
    });
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div className="member-statistics">
        <React.Fragment>
          <div className="member-statistics__body">
            <div className="member-statistics__body__numbers">
              <NumberAdmin
                numberAdmin={this.state.numberAdmins.data.absent}
                isFetching={this.state.numberAdmins.isFetching}
                isEmpty={this.state.numberAdmins.isEmpty}
              ></NumberAdmin>

              <NumberAdmin
                numberAdmin={this.state.numberAdmins.data.late}
                isFetching={this.state.numberAdmins.isFetching}
                isEmpty={this.state.numberAdmins.isEmpty}
              ></NumberAdmin>

              <NumberAdmin
                numberAdmin={this.state.numberAdmins.data.onTime}
                isFetching={this.state.numberAdmins.isFetching}
                isEmpty={this.state.numberAdmins.isEmpty}
              ></NumberAdmin>

              <NumberAdmin
                numberAdmin={this.state.numberAdmins.data.redundant}
                isFetching={this.state.numberAdmins.isFetching}
                isEmpty={this.state.numberAdmins.isEmpty}
              ></NumberAdmin>
            </div>

            <div className="member-statistics__body__card">
              <div className="member-statistics__body__card__title">
                {this.state.member.isFetching && this.state.member.isEmpty && <LoadingSmall />}
                {this.state.member.isEmpty && !this.state.member.isFetching && "trống"}
                {!this.state.member.isFetching && !this.state.member.isEmpty && (
                  <div> {this.state.member.data.firstName} {this.state.member.data.lastName}</div>
                )}
              </div>
              <div className="member-statistics__body__card__content">
                <div className="member-statistics__body__card__content__chart">
                  <div className="member-statistics__body__card__content__chart__filter">
                    <div className="member-statistics__body__card__content__chart__filter__form">
                      <input
                        type="text"
                        className="member-statistics__body__card__content__chart__filter__form__input"
                        placeholder="Chọn ngày bắt đầu"
                        value={this.state.startTime.data}
                        onChange={() => { this.changeStartTime() }}
                        //onBlur={() => { this.changeStartTime() }}
                        readonly
                        ref="startTime"
                      />
                      <input
                        type="text"
                        className="member-statistics__body__card__content__chart__filter__form__input"
                        placeholder="Chọn ngày kết thúc"
                        value={this.state.endTime.data}
                        onChange={() => { this.changeEndTime() }}
                        //onBlur={() => { this.changeEndTime() }}
                        readonly
                        ref="endTime"
                      />
                      <CustomSelect
                        customSelect={this.state.filterByTimeType}
                        filterByTimeType={this.filterByTimeType}
                      ></CustomSelect>
                    </div>
                  </div>



                  <div className="member-statistics__body__card__content__chart__row">
                    <CalendarChart
                      calendarChartData={this.state.calendarChartData}
                      isFetching={this.state.calendarChartData.isFetching}
                      isEmpty={this.state.calendarChartData.isEmpty}
                    ></CalendarChart>
                  </div>

                  <div className="member-statistics__body__card__content__chart__row">
                    {/* <ColumnChart
                      columnChartData={this.state.columnChartData}
                      isFetching={this.state.columnChartData.isFetching}
                      isEmpty={this.state.columnChartData.isEmpty}
                    ></ColumnChart> */}

                    <PieChart
                      pieChartData={this.state.pieChartData}
                      isFetching={this.state.pieChartData.isFetching}
                      isEmpty={this.state.pieChartData.isEmpty}
                    ></PieChart>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="member-statistics__body__table">
              <Table
                tableContents={this.state.tableDetails.data.absent}
                isFetching={this.state.tableDetails.isFetching}
                isEmpty={this.state.tableDetails.isEmpty}
              ></Table>

              <Table
                tableContents={this.state.tableDetails.data.late}
                isFetching={this.state.tableDetails.isFetching}
                isEmpty={this.state.tableDetails.isEmpty}
              ></Table>

              <Table
                tableContents={this.state.tableDetails.data.onTime}
                isFetching={this.state.tableDetails.isFetching}
                isEmpty={this.state.tableDetails.isEmpty}
              ></Table>

              <Table
                tableContents={this.state.tableDetails.data.redundant}
                isFetching={this.state.tableDetails.isFetching}
                isEmpty={this.state.tableDetails.isEmpty}
              ></Table>
            </div> */}
          </div>
        </React.Fragment>
      </div>

    );
  }
}
