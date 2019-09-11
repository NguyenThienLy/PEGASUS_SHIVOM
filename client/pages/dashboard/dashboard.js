import * as React from "react";

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
  CustomSelect
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
      numberAdmins: [
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi đúng giờ",
          quantity: 0,
          colorIcon: "#f5365c"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi trễ",
          quantity: 0,
          colorIcon: "#fb6340"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Vắng",
          quantity: 0,
          colorIcon: "#ffd600"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi thừa",
          quantity: 0,
          colorIcon: "#11cdef"
        }
      ],
      customSelect: {
        placeholder: "Chọn năm...",
        options: [2015, 2016, 2017, 2018, 2019]
      },
      activitiesArr: [
        [
          {
            time: "15 phút",
            content: "bình luận"
          },
          {
            time: "5 phút",
            content: "like ảnh"
          },
          {
            time: "45 phút",
            content: "cập nhật thời khóa biểu"
          }
        ],
        [
          {
            time: "15 phút",
            content: "bình luận"
          },
          {
            time: "5 phút",
            content: "like ảnh"
          },
          {
            time: "45 phút",
            content: "cập nhật thời khóa biểu"
          }
        ],
        [
          {
            time: "15 phút",
            content: "bình luận"
          },
          {
            time: "5 phút",
            content: "like ảnh"
          },
          {
            time: "45 phút",
            content: "cập nhật thời khóa biểu"
          }
        ]
      ]
    };
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  fetchData = () => {
    this.props.fetchLineChart(
      null,
      "week",
      "2017-08-01T03:44:18.995Z",
      "2022-08-01T03:44:18.995Z"
    );

    this.props.fetchPieChart(
      null,
      "year",
      "2017-08-01T03:44:18.995Z",
      "2022-08-01T03:44:18.995Z"
    );

    this.props.fetchColumnChart(
      null,
      "2017-08-01T03:44:18.995Z",
      "2022-08-01T03:44:18.995Z"
    );
  };
  handleScroll = () => {};
  componentWillUnmount() {}
  async componentDidMount() {
    this.fetchData();

    var heightOfHeader = $(
      ".dashboard .dashboard__header .headerAdmin"
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
      newNumberAdmins[0].quantity = this.props.statisticCourse.statisticForPieChart.data.totalOnTime;
      newNumberAdmins[1].quantity = this.props.statisticCourse.statisticForPieChart.data.totalLate;
      newNumberAdmins[2].quantity = this.props.statisticCourse.statisticForPieChart.data.totalAbsent;
      newNumberAdmins[3].quantity = this.props.statisticCourse.statisticForPieChart.data.totalRedundant;

      this.setState({ numberAdmins: newNumberAdmins });
    }
    return true;
  }

  render() {
    //console.log("render");
    //console.log("this props: ", this.props);
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
          <div className="dashboard__header">
            <HeaderAdmin headerAdmin={this.state.headerAdmin}></HeaderAdmin>
          </div>
          <div className="dashboard__sidebar">
            <Sidebar></Sidebar>
          </div>
          <div className="dashboard__body">
            <div className="dashboard__body__numbers">
              {this.props.statisticCourse.statisticForPieChart.fetching
                ? "dang load"
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
                    ></CustomSelect>
                  </div>
                  <div className="dashboard__body__card__content__chart__row">
                    <ColumnChart></ColumnChart>
                    <PieChart></PieChart>
                  </div>
                  <div className="dashboard__body__card__content__chart__row dashboard__body__card__content__chart__single">
                    <LineChart></LineChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard__body__table">
              <Table></Table>
            </div>
            <div className="dashboard__body__activities">
              {this.state.activitiesArr.map(activities => {
                return <Activity activities={activities}></Activity>;
              })}
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
      fetchColumnChart: action.student.fetchForColumnChart
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
