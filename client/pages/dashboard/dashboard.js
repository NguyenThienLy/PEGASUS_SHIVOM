import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import "./dashboard.scss";
import {
  Sidebar,
  HeaderAdmin,
  NumberAdmin,
  PieChart,
  LineChart,
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
      sidebar: {
        homeLink: "#",
        logoSource: "/logo.png",
        title: "Shivom Dashboard",
        listItems: [
          {
            link: "#",
            icon: "<i class='fas fa-user'></i>",
            name: "Trang chủ"
          },
          {
            link: "#",
            icon: "<i class='far fa-list-alt'></i>",
            name: "Khóa học",
            subItems: [
              {
                link: "#",
                name: "Khóa học 1"
              },
              {
                link: "#",
                name: "Khóa học 2"
              },
              {
                link: "#",
                name: "Khóa học 3"
              }
            ]
          },
          {
            link: "#",
            icon: "<i class='far fa-newspaper'></i>",
            name: "Tin tức",
            subItems: [
              {
                link: "#",
                name: "Tin tức 1"
              },
              {
                link: "#",
                name: "Tin tức 2"
              },
              {
                link: "#",
                name: "Tin tức 3"
              }
            ]
          },
          {
            link: "#",
            icon: "<i class='fas fa-info'></i>",
            name: "Về chúng tôi"
          }
        ]
      },
      numberAdmins: [
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi đúng giờ",
          quantity: 184,
          colorIcon: "#f5365c"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi trễ",
          quantity: 60,
          colorIcon: "#fb6340"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Vắng",
          quantity: 24,
          colorIcon: "#ffd600"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi thừa",
          quantity: 13,
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
  handleScroll = () => {};
  componentWillUnmount() {}
  componentDidMount() {
    var heightOfHeader = $(
      ".dashboard .dashboard__header .headerAdmin__wrapper"
    ).height();
    $(".dashboard .dashboard__body").css("margin-top", heightOfHeader + "px");
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
          <div class="background-overlay"></div>
          <div className="dashboard__header">
            <HeaderAdmin
              sidebar={this.state.sidebar}
              headerAdmin={this.state.headerAdmin}
            ></HeaderAdmin>
          </div>
          <div className="dashboard__sidebar">
            <Sidebar sidebar={this.state.sidebar}></Sidebar>
          </div>
          <div className="dashboard__body">
            <div className="dashboard__body__numbers">
              {this.state.numberAdmins.map(number => {
                return <NumberAdmin numberAdmin={number}></NumberAdmin>;
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
                    <LineChart></LineChart>
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

export default connect(mapStateToProps)(Dashboard);
