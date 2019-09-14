import * as React from "react";
import * as moment from "moment";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";
import { bindActionCreators } from "redux";

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
  FeedbackAdmin
} from "../../components";
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
      categories: [
        {
          name: "trang chủ",
          linkHref: "/home/home",
          linkAs: "/",
          key: "home"
        },
        {
          name: "khoá học",
          key: "course",
          subCategories: []
        },
        {
          name: "tin tức",
          key: "news",
          subCategories: [
            {
              name: "khoá học môt",
              linkHref: "/blog/blog?categorySlug=khoa-hoc-not",
              linkAs: "/khoa-hoc-mot"
            },
            {
              name: "khoá học hai",
              linkHref: "/home/home",
              linkAs: "/"
            },
            {
              name: "khoá học ba",
              linkHref: "/home/home",
              linkAs: "/"
            }
          ]
        },
        {
          name: "về chúng tôi",
          linkHref: "/contact/contact",
          linkAs: "/lien-he",
          key: "about"
        }
      ],
      // sidebar: {
      //   homeLink: "#",
      //   logoSource: "/logo.png",
      //   title: "Shivom Dashboard",
      //   listItems: [
      //     {
      //       link: "#",
      //       icon: "<i class='fas fa-user'></i>",
      //       name: "Trang chủ"
      //     },
      //     {
      //       link: "#",
      //       icon: "<i class='far fa-list-alt'></i>",
      //       name: "Khóa học",
      //       subItems: [
      //         {
      //           link: "#",
      //           name: "Khóa học 1"
      //         },
      //         {
      //           link: "#",
      //           name: "Khóa học 2"
      //         },
      //         {
      //           link: "#",
      //           name: "Khóa học 3"
      //         }
      //       ]
      //     },
      //     {
      //       link: "#",
      //       icon: "<i class='far fa-newspaper'></i>",
      //       name: "Tin tức",
      //       subItems: [
      //         {
      //           link: "#",
      //           name: "Tin tức 1"
      //         },
      //         {
      //           link: "#",
      //           name: "Tin tức 2"
      //         },
      //         {
      //           link: "#",
      //           name: "Tin tức 3"
      //         }
      //       ]
      //     },
      //     {
      //       link: "#",
      //       icon: "<i class='fas fa-info'></i>",
      //       name: "Về chúng tôi"
      //     }
      //   ]
      // },
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
        content: "sắp tới ngày sinh nhật"
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
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  fetchData = (startTime, endTime) => {
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

    // this.props.fetchBirthday({
    //   query: {
    //     filter: { status: "active" },
    //     limit: 10
    //   },
    //   order: {}
    // })

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
      //fields: ["avatar","firstName", "lastName", "createdAt"],
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
  handleScroll = () => {};
  componentWillUnmount() {}
  async componentDidMount() {
    // Lấy năm
    // startTime bắt đầu năm hiện tại
    // endTime bắt đầu năm hiện tại
    this.fetchData(
      moment()
        .startOf("year")
        .format("YYYY-MM-DD HH:mm:ss"),
      moment()
        .endOf("year")
        .format("YYYY-MM-DD HH:mm:ss")
    );

    if (this.props.courses.items.length > 0) {
      const courseCategoryIndex = this.state.categories.findIndex(item => {
        return item.key === "course";
      });
      const subCategories = this.props.courses.items.map(item => {
        return {
          name: item.name,
          linkHref: `/course/course?slug=${item.slug}`,
          linkAs: `/khoa-hoc/${item.slug}`
        };
      });
      this.state.categories[courseCategoryIndex].subCategories = subCategories;
      this.setState({ categories: this.state.categories });
    }
    if (this.props.newCategories.items.length > 0) {
      const newCategoryIndex = this.state.categories.findIndex(item => {
        return item.key === "news";
      });
      const subCategories = this.props.newCategories.items.map(item => {
        return {
          name: item.name,
          linkHref: `/blog/blog?categorySlug=${item.slug}`,
          linkAs: `/${item.slug}`
        };
      });
      this.state.categories[newCategoryIndex].subCategories = subCategories;
      this.setState({ categories: this.state.categories });
    }

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
      prevProps.courses.items.length === 0 &&
      this.props.courses.items.length > 0
    ) {
      const courseCategoryIndex = this.state.categories.findIndex(item => {
        return item.key === "course";
      });
      const subCategories = this.props.courses.items.map(item => {
        return {
          name: item.name,
          linkHref: `/course/course?slug=${item.slug}`,
          linkAs: `/khoa-hoc/${item.slug}`
        };
      });
      this.state.categories[courseCategoryIndex].subCategories = subCategories;
      this.setState({ categories: this.state.categories });
    }
    if (
      prevProps.newCategories.items.length === 0 &&
      this.props.newCategories.items.length > 0
    ) {
      const newCategoryIndex = this.state.categories.findIndex(item => {
        return item.key === "news";
      });
      const subCategories = this.props.newCategories.items.map(item => {
        return {
          name: item.name,
          linkHref: `/blog/blog?categorySlug=${item.slug}`,
          linkAs: `/${item.slug}`
        };
      });
      this.state.categories[newCategoryIndex].subCategories = subCategories;
      this.setState({ categories: this.state.categories });
    }

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

  render() {
    return (
      <div className="dashboard">
        <Head>
          <title>Dashboard</title>
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
            <Sidebar
              sidebar={this.state.categories}
              logo={this.props.setting.logo}
            ></Sidebar>
          </div>
          <div className="dashboard__body">
            <div className="dashboard__body__numbers">
              {this.props.statisticCourse.statisticForPieChart.fetching
                ? "đang tải ..."
                : this.state.numberAdmins.map((number, index) => {
                    return (
                      <NumberAdmin
                        numberAdmin={number}
                        key={index}
                      ></NumberAdmin>
                    );
                  })}
            </div>
            <div className="dashboard__body__card">
              <div className="dashboard__body__card__title">Thống kê</div>
              <div className="dashboard__body__card__content">
                <div className="dashboard__body__card__content__chart">
                  <div className="dashboard__body__card__content__chart__filter">
                    <CustomSelect
                      customSelect={this.state.customSelect}
                      fetchData={this.fetchData}
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
                  <div className="dashboard__body__card__content__linechart__row">
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
            <div className="dashboard__body__table">
              <FeedbackAdmin
                feedbackAdmins={this.props.feedbacks.items}
                staticContent={this.state.feedbackAdmin}
              ></FeedbackAdmin>
            </div>
            <div className="dashboard__body__activities">
              <Activity
                activities={this.props.students.itemsNewStudents.data}
                staticContent={this.state.newStudent}
              ></Activity>

              <Activity
                activities={this.props.students.itemsTopPoint.data}
                staticContent={this.state.topPoint}
              ></Activity>

              <Activity
                activities={this.props.students.itemsUpcommingBirthday.data}
                staticContent={this.state.birthday}
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
      fetchFeedBack: action.feedback.fetch
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
