import * as React from "react";
import * as moment from "moment";

import Head from "next/head";
import Link from "next/link";
import Router from "next/router"
import { connect } from "react-redux";
import { api } from "../../../services";
import { action } from "../../../actions";
import { bindActionCreators } from "redux";
import Swal from 'sweetalert2'

import "./dashboard.scss";
import {
  Sidebar,
  HeaderAdmin,
  NumberAdmin,
  PieChart,
  LineChart,
  ColumnChart,
  Table,
  Activity,
  CustomSelect,
  FeedbackAdmin,
  AdminSidebar,
  Loading
} from "../../../components";
import GoogleMapReact from "google-map-react";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerAdmin: {
        avatar:
          "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
        name: "Avril Lavigne"
      },

      numberAdmins: [
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi đúng giờ",
          quantity: 0,
          colorIcon: "#f5365c",
          isEmpty: true
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi trễ",
          quantity: 0,
          colorIcon: "#fb6340",
          isEmpty: true
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Vắng",
          quantity: 0,
          colorIcon: "#ffd600",
          isEmpty: true
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi thừa",
          quantity: 0,
          colorIcon: "#11cdef",
          isEmpty: true
        }
      ],
      customSelect: {
        placeholder: "Chọn năm...",
        options: [2019, 2020, 2021, 2022, 2023]
      },
      birthday: {
        nameTable: "Sinh nhật học viên",
        content: "sắp tới ngày sinh"
      },
      newStudent: {
        nameTable: "Học viên mới tham gia",
        content: "vừa nhập học"
      },
      topPoint: {
        nameTable: "Bảng xếp hạng tích điểm",
        content: null
      },
      feedbackAdmin: {
        nameTable: "Phản hồi từ học viên",
        content: null
      },
      columnChartData: {
        labels: null,
        datasets: [
          {
            label: "Số học viên",
            data: null,
            backgroundColor: "rgba(75, 192, 192, 0.6)"
          }
        ],
        isEmpty: true
      },
      pieChartData: {
        labels: null,
        datasets: [
          {
            data: null,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)"
            ]
          }
        ],
        isEmpty: true
      },
      lineChartData: {
        labels: null,
        datasets: [
          {
            label: "Vắng học",
            fill: false,
            data: null,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 0.6)"
          },
          {
            label: "Trễ giờ",
            fill: false,
            data: null,
            backgroundColor: "rgba(255, 206, 86, 0.6)",
            borderColor: "rgba(255, 206, 86, 0.6)"
          },
          {
            label: "Đúng giờ",
            fill: false,
            data: null,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 0.6)"
          },
          {
            label: "Đi thừa",
            fill: false,
            data: null,
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 0.6)"
          }
        ],
        isEmpty: true
      }
    };

    this.updateIgnoreFeedbacks = this.updateIgnoreFeedbacks.bind(this)
    this.updateConfirmFeedbacks = this.updateConfirmFeedbacks.bind(this)
  }
  static async getInitialProps({ req, query }) {
    return {};
  }

  fetchDataFollowYear = (startTime, endTime) => {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M";

    this.props.fetchLineChart(
      null,
      "week",
      `${startTime}Z`,
      `${endTime}Z`,
      token
    );

    this.props.fetchPieChart(
      null,
      "year",
      `${startTime}Z`,
      `${endTime}Z`,
      token
    );

    this.props.fetchColumnChart(null, `${startTime}Z`, `${endTime}Z`, token);
  };

  fetchData = () => {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M";

    this.props.fetchBirthday({
      query: {
        endTime: `${moment()
          .endOf("year")
          .subtract(7, "hours")
          .format("YYYY-MM-DDTHH:mm:ss")}Z`
      },
      headers: {
        "x-token": token
      }
    });

    this.props.fetchNewStudent({
      query: {
        filter: { status: "active" },
        limit: 10,
        order: { createdAt: -1 }
      },
      headers: {
        "x-token": token
      }
    });

    this.props.fetchTopPoint({
      query: {
        filter: { status: "active" },
        limit: 10,
        order: { point: -1 }
      },
      headers: {
        "x-token": token
      }
    });

    this.props.fetchFeedBack({
      query: {
        filter: { isReply: false },
        order: { createdAt: -1 },
        populates: ["student"]
      },
      headers: {
        "x-token": token
      }
    });
  };

  updateIgnoreFeedbacks(id, body) {
    // Swal.showLoading()
    // this.props.updateIgnoreFeedbacks(id, body).then(res => {
    //   Swal.fire("Thành công", "Bỏ qua phản hồi thành công", "success")
    // }).catch(err => {
    //   Swal.fire("Thất bại", "Bỏ qua phản hồi thất bại", "error")
    // })

    this.props.updateIgnoreFeedbacks(id, body)
    this.forceUpdate()
  };

  updateConfirmFeedbacks(id, body) {
    //Swal.showLoading()

    this.props.updateConfirmFeedbacks(id, body)
    this.forceUpdate()

    // if (this.props.updateConfirmFeedbacks(id, body).isUpdateSuccess &&
    //   this.props.updateConfirmFeedbacks(id, body).isDeleteSuccess)
    //   Swal.fire("Thành công", "Xác nhận phản hồi thành công", "success")
    // else
    //   Swal.fire("Thất bại", "Xác nhận phản hồi thất bại", "error")
    // then(res => {
    //   Swal.fire("Thành công", "Xác nhận phản hồi thành công", "success")
    // }).catch(err => {
    //   Swal.fire("Thất bại", "Xác nhận phản hồi thất bại", "error")
    // })
  }

  handleScroll = () => { };
  componentWillUnmount() { }
  async componentDidMount() {
    this.checkUserAlreadyLogin()
    // Lấy năm
    // startTime bắt đầu năm hiện tại
    // endTime bắt đầu năm hiện tại
    this.fetchDataFollowYear(
      moment()
        .startOf("year")
        .format("YYYY-MM-DD HH:mm:ss"),
      moment()
        .endOf("year")
        .format("YYYY-MM-DD HH:mm:ss")
    );

    this.fetchData();

    var heightOfHeader = $(
      ".dashboard .dashboard__header .headerAdmin__wrapper"
    ).height();
    $(".dashboard .dashboard__body").css("margin-top", heightOfHeader + "px");
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {


    if (
      prevProps.statisticCourse.statisticForPieChart.fetching &&
      !this.props.statisticCourse.statisticForPieChart.fetching
    ) {
      const newNumberAdmins = prevState.numberAdmins;
      const newPieChartData = prevState.pieChartData;

      // Gán số lượng loại chuyên cần cho component admin
      newNumberAdmins[0].quantity = this.props.statisticCourse.statisticForPieChart.data.totalOnTime;
      newNumberAdmins[1].quantity = this.props.statisticCourse.statisticForPieChart.data.totalLate;
      newNumberAdmins[2].quantity = this.props.statisticCourse.statisticForPieChart.data.totalAbsent;
      newNumberAdmins[3].quantity = this.props.statisticCourse.statisticForPieChart.data.totalRedundant;

      newNumberAdmins[0].isEmpty = newNumberAdmins[1].isEmpty = newNumberAdmins[2].isEmpty = newNumberAdmins[3].isEmpty = this.props.statisticCourse.statisticForPieChart.data.isEmpty;
      // Thống kê trên biểu đồ tròn
      newPieChartData.datasets[0].data = this.props.statisticCourse.statisticForPieChart.data.data;
      newPieChartData.labels = this.props.statisticCourse.statisticForPieChart.data.labels;
      newPieChartData.isEmpty = this.props.statisticCourse.statisticForPieChart.data.isEmpty;

      this.setState({
        numberAdmins: newNumberAdmins,
        pieChartData: newPieChartData
      });
    }

    if (
      prevProps.students.statisticForColumnChart.fetching &&
      !this.props.students.statisticForColumnChart.fetching
    ) {
      const newColumnChartData = prevState.columnChartData;

      // Thống kê trên biểu đồ cột
      newColumnChartData.datasets[0].data = this.props.students.statisticForColumnChart.data.data;
      newColumnChartData.labels = this.props.students.statisticForColumnChart.data.labels;
      newColumnChartData.isEmpty = this.props.students.statisticForColumnChart.data.isEmpty;

      this.setState({
        columnChartData: newColumnChartData
      });
    }

    if (
      prevProps.statisticCourse.statisticForLineChart.fetching &&
      !this.props.statisticCourse.statisticForLineChart.fetching
    ) {
      const newLineChartData = prevState.lineChartData;

      // Thông kê trên biểu đồ đường
      newLineChartData.datasets[0].data = this.props.statisticCourse.statisticForLineChart.data.dataAbsents;
      newLineChartData.datasets[1].data = this.props.statisticCourse.statisticForLineChart.data.dataLates;
      newLineChartData.datasets[2].data = this.props.statisticCourse.statisticForLineChart.data.dataOnTimes;
      newLineChartData.datasets[3].data = this.props.statisticCourse.statisticForLineChart.data.dataRedundants;

      newLineChartData.labels = this.props.statisticCourse.statisticForLineChart.data.labels;
      newLineChartData.isEmpty = this.props.statisticCourse.statisticForLineChart.data.isEmpty;

      this.setState({
        lineChartData: newLineChartData
      });
    }

    return true;
  }

  async checkUserAlreadyLogin() {
    const userType = localStorage.getItem("ut")
    const tokenExpiredAt = localStorage.getItem("exp")
    if (!userType || !tokenExpiredAt || moment(tokenExpiredAt).isBefore(moment()) || userType !== "admin") {
      Router.push("/dang-nhap/admin")
    }
  }

  render() {

    return (
      <div className="dashboard">
        <Head>
          <title>Dashboard</title>
          <meta name="robots" content="noindex" />
          <meta name="title" content="Dashboard" />
          <meta
            name="description"
            content="Dashboard trung tâm yoga Hiệp Hòa"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <React.Fragment>
          <div className="background-overlay"></div>
          <div className="dashboard__header">
            <HeaderAdmin
              sidebar={this.state.categories}
              headerAdmin={this.state.headerAdmin}
              logo={this.props.setting.logo}
            ></HeaderAdmin>
          </div>
          <div className="dashboard__sidebar">
            <AdminSidebar logo={this.props.setting.logo} />
          </div>
          <div className="dashboard__body">
            <div className="dashboard__body__numbers">
              {this.props.statisticCourse.statisticForPieChart.fetching ? (
                <Loading />
              ) : (
                  this.state.numberAdmins.map((number, index) => {
                    return (
                      <NumberAdmin numberAdmin={number} key={index}></NumberAdmin>
                    );
                  })
                )}
            </div>
            <div className="dashboard__body__card">
              <div className="dashboard__body__card__title">Thống kê</div>
              <div className="dashboard__body__card__content">
                <div className="dashboard__body__card__content__chart">
                  <div className="dashboard__body__card__content__chart__filter">
                    <CustomSelect
                      customSelect={this.state.customSelect}
                      fetchDataFollowYear={this.fetchDataFollowYear}
                    ></CustomSelect>
                  </div>
                  <div className="dashboard__body__card__content__chart__row">
                    <ColumnChart
                      columnChartData={this.state.columnChartData}
                      isFetching={
                        this.props.students.statisticForColumnChart.fetching
                      }
                      isEmpty={this.state.columnChartData.isEmpty}
                    ></ColumnChart>

                    <PieChart
                      pieChartData={this.state.pieChartData}
                      isFetching={
                        this.props.statisticCourse.statisticForPieChart.fetching
                      }
                      isEmpty={this.state.pieChartData.isEmpty}
                    ></PieChart>
                  </div>
                  <div className="dashboard__body__card__content__chart__row-single">
                    <LineChart
                      lineChartData={this.state.lineChartData}
                      isFetching={
                        this.props.statisticCourse.statisticForLineChart
                          .fetching
                      }
                      isEmpty={this.state.lineChartData.isEmpty}
                    ></LineChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard__body__feedback">
              <FeedbackAdmin
                feedbackAdmins={this.props.feedbacks.items}
                staticContent={this.state.feedbackAdmin}
                isFetching={
                  this.props.feedbacks.fetching
                }
                updateIgnoreFeedbacks={this.updateIgnoreFeedbacks}
                updateConfirmFeedbacks={this.updateConfirmFeedbacks}
              ></FeedbackAdmin>
            </div>
            <div className="dashboard__body__activities">
              <Activity
                activities={this.props.students.itemsNewStudents.data}
                staticContent={this.state.newStudent}
                isFetching={
                  this.props.students.itemsNewStudents.fetching
                }
              ></Activity>

              <Activity
                activities={this.props.students.itemsTopPoint.data}
                staticContent={this.state.topPoint}
                isFetching={
                  this.props.students.itemsTopPoint.fetching
                }
              ></Activity>

              <Activity
                activities={this.props.students.itemsUpcommingBirthday.data}
                staticContent={this.state.birthday}
                isFetching={
                  this.props.students.itemsUpcommingBirthday.fetching
                }
              ></Activity>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLineChart: action.statisticCourse.fetchForLineChart,
      fetchPieChart: action.statisticCourse.fetchForPieChart,
      fetchColumnChart: action.student.fetchForColumnChart,
      fetchBirthday: action.student.fetchForUpcommingBirthday,
      fetchNewStudent: action.student.fetchForNewStudents,
      fetchTopPoint: action.student.fetchForTopPoint,
      fetchFeedBack: action.feedback.fetch,
      updateIgnoreFeedbacks: action.feedback.updateIgnoreFeedbacks,
      updateConfirmFeedbacks: action.feedback.updateConfirmFeedbacks
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
