import * as React from "react";

import Head from "next/head";
import { connect } from "react-redux";

import "./courseDetails.scss";
import {
  Sidebar,
  HeaderAdmin,
  NumberAdmin,
  PieChart,
  LineChart,
  Table,
  CustomSelect,
  ProfileAdmin
} from "../../components";
import { CourseInfo } from "../../components/courseInfo/courseInfo";

export class CourseDetails extends React.Component {
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
      customSelectCourse: {
        placeholder: "Chọn khóa học...",
        options: ["Yoga cho người cao tuổi", "Yoga cộng đồng"]
      },
      profileAdmin: {
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/06/team2-img-8.jpg",
        name: "nisha sharma",
        phone: "0947161096",
        email: "nisha_sharma@gmail.com",
        location: "remote",
        age: 25,
        facebook: "facebook.com",
        twitter: "twitter.com",
        instagram: "instagram.com"
      }
    };
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  handleScroll = () => {};
  componentWillUnmount() {}
  componentDidMount() {
    var heightOfHeader = $(
      ".courseDetails .courseDetails__header .headerAdmin__wrapper"
    ).height();
    $(".courseDetails .courseDetails__body").css(
      "margin-top",
      heightOfHeader + "px"
    );
  }
  render() {
    return (
      <div className="courseDetails">
        <Head>
          <title>Course's Details</title>
          <meta name="title" content="Course's Details" />
          <meta
            name="description"
            content="Chi tiết khóa học trung tâm yoga Hiệp Hòa"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <React.Fragment>
          <div className="courseDetails__header">
            <HeaderAdmin
              sidebar={this.state.sidebar}
              headerAdmin={this.state.headerAdmin}
            ></HeaderAdmin>
          </div>
          <div className="courseDetails__sidebar">
            <Sidebar sidebar={this.state.sidebar}></Sidebar>
          </div>
          <div className="courseDetails__body">
            <div className="courseDetails__body__numbers">
              {this.state.numberAdmins.map(number => {
                return <NumberAdmin numberAdmin={number}></NumberAdmin>;
              })}
            </div>
            <div className="courseDetails__body__card">
              <div className="courseDetails__body__card__title">
                Thông tin khóa học
              </div>
              <div className="courseDetails__body__card__content">
                <div className="courseDetails__body__card__content__course">
                  <div className="courseDetails__body__card__content__course__filter">
                    <CustomSelect
                      customSelect={this.state.customSelectCourse}
                    ></CustomSelect>
                  </div>
                  <div className="courseDetails__body__card__content__course__info">
                    <CourseInfo></CourseInfo>
                    <ProfileAdmin
                      profileAdmin={this.state.profileAdmin}
                    ></ProfileAdmin>
                  </div>
                </div>
              </div>
            </div>
            <div className="courseDetails__body__card">
              <div className="courseDetails__body__card__title">
                Thống kê khóa học
              </div>
              <div className="courseDetails__body__card__content">
                <div className="courseDetails__body__card__content__chart">
                  <div className="courseDetails__body__card__content__chart__filter">
                    <form className="courseDetails__body__card__content__chart__filter__form">
                      <input
                        type="text"
                        className="courseDetails__body__card__content__chart__filter__form__input"
                        placeholder="Chọn ngày bắt đầu"
                      />
                      <input
                        type="text"
                        className="courseDetails__body__card__content__chart__filter__form__input"
                        placeholder="Chọn ngày kết thúc"
                      />
                      <button
                        type="button"
                        className="courseDetails__body__card__content__chart__filter__form__btn courseDetails__body__card__content__chart__filter__form__btn--primary"
                      >
                        thống kê
                      </button>
                    </form>
                  </div>
                  <div className="courseDetails__body__card__content__chart__row">
                    <LineChart></LineChart>
                  </div>
                  <div className="courseDetails__body__card__content__chart__row">
                    <PieChart></PieChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="courseDetails__body__table">
              <Table></Table>
              <Table></Table>
              <Table></Table>
              <Table></Table>
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

export default connect(mapStateToProps)(CourseDetails);
