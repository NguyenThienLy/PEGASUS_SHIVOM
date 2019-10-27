import * as React from 'react';
import * as moment from 'moment';
import {
  NumberAdmin,
  PieChart,
  LineChart,
  CustomSelect
} from '../../../../components';
import './statistic.scss';
export class StatisticMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      columnChartData: {
        timeType: null,
        labels: null,
        isEmpty: true,
        isFetching: false,
        datasets: [
          {
            label: 'Số học viên',
            data: null,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      },
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
      lineChartData: {
        timeType: null,
        labels: null,
        isEmpty: true,
        isFetching: false,
        datasets: [
          {
            label: 'Vắng học',
            fill: false,
            data: null,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 0.6)'
          },
          {
            label: 'Trễ giờ',
            fill: false,
            data: null,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 0.6)'
          },
          {
            label: 'Đúng giờ',
            fill: false,
            data: null,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 0.6)'
          },
          {
            label: 'Đi thừa',
            fill: false,
            data: null,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 0.6)'
          }
        ]
      },
      filterByTimeType: {
        placeholder: 'Theo tuần',
        options: ['Thời gian thực', 'Theo tuần', 'Theo tháng', 'Theo năm'],
        values: ['realTime', 'week', 'month', 'year']
      }
    };

    this.filterByTimeType = this.filterByTimeType.bind(this);
  }

  filterByTimeType(timeType) {
    const startTime = moment(
      this.refs.startTime.value
        .split('/')
        .reverse()
        .join('/')
    )
      .startOf('dates')
      .format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(
      this.refs.endTime.value
        .split('/')
        .reverse()
        .join('/')
    )
      .endOf('dates')
      .format('YYYY-MM-DD HH:mm:ss');

    this.changeIsFetching(true);
    this.fetchData(startTime, endTime, timeType);
  }

  componentDidMount() {
    // var heightOfHeader = $(
    //     ".member-statistics .member-statistics__header .headerAdmin__wrapper"
    // ).height();
    // $(".member-statistics .member-statistics__body").css(
    //     "margin-top",
    //     heightOfHeader + "px"
    // );

    $(
      '.member-statistics__body__card__content__chart__filter__form__input'
    ).datetimepicker({
      format: 'd/m/Y',
      timepicker: false,
      mask: false
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.statisticCourse.statisticForPieChart.fetching &&
      !this.props.statisticCourse.statisticForPieChart.fetching
    ) {
      const newNumberAdmins = prevState.numberAdmins;
      newNumberAdmins[0].quantity = this.props.statisticCourse.statisticForPieChart.data.totalOnTime;
      newNumberAdmins[1].quantity = this.props.statisticCourse.statisticForPieChart.data.totalLate;
      newNumberAdmins[2].quantity = this.props.statisticCourse.statisticForPieChart.data.totalAbsent;
      newNumberAdmins[3].quantity = this.props.statisticCourse.statisticForPieChart.data.totalRedundant;

      this.setState({ numberAdmins: newNumberAdmins });
    }
    return true;
  }

  render() {
    return (
      <div className="member-statistics">
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
              Thống kê khóa học
            </div>
            <div className="member-statistics__body__card__content">
              <div className="member-statistics__body__card__content__chart">
                <div className="member-statistics__body__card__content__chart__filter">
                  <div className="member-statistics__body__card__content__chart__filter__form">
                    <input
                      type="text"
                      className="member-statistics__body__card__content__chart__filter__form__input"
                      placeholder="Chọn ngày bắt đầu"
                    />
                    <input
                      type="text"
                      className="member-statistics__body__card__content__chart__filter__form__input"
                      placeholder="Chọn ngày kết thúc"
                    />
                    <CustomSelect
                      customSelect={this.state.filterByTimeType}
                      filterByTimeType={this.filterByTimeType}
                    ></CustomSelect>
                  </div>
                </div>
                <div className="member-statistics__body__card__content__chart__row">
                  <LineChart
                    lineChartData={this.state.lineChartData}
                    isFetching={this.state.lineChartData.isFetching}
                    isEmpty={this.state.lineChartData.isEmpty}
                  ></LineChart>
                </div>
                <div className="member-statistics__body__card__content__chart__row">
                  <PieChart
                    pieChartData={this.state.pieChartData}
                    isFetching={this.state.pieChartData.isFetching}
                    isEmpty={this.state.pieChartData.isEmpty}
                  ></PieChart>
                </div>
              </div>
            </div>
          </div>
          <div className="member-statistics__body__table">
            {/* <Table

                            ></Table> */}
          </div>
        </div>
      </div>
    );
  }
}
