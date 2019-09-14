import * as React from "react";

import Head from "next/head";
import { connect } from "react-redux";

import "./memberDetails.scss";
import {
  Sidebar,
  HeaderAdmin,
  NumberAdmin,
  PieChart,
  LineChart,
  Table,
  CustomSelect,
  MemberInfo
} from "../../components";

export class MemberDetails extends React.Component {
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
      numberAdmins: [
        {
          icon: '<i className="fas fa-id-card-alt"></i>',
          about: "Đi đúng giờ",
          quantity: 184,
          colorIcon: "#f5365c"
        },
        {
          icon: '<i className="fas fa-id-card-alt"></i>',
          about: "Đi trễ",
          quantity: 60,
          colorIcon: "#fb6340"
        },
        {
          icon: '<i className="fas fa-id-card-alt"></i>',
          about: "Vắng",
          quantity: 24,
          colorIcon: "#ffd600"
        },
        {
          icon: '<i className="fas fa-id-card-alt"></i>',
          about: "Đi thừa",
          quantity: 13,
          colorIcon: "#11cdef"
        }
      ],
      customSelectMember: {
        placeholder: "Chọn học viên...",
        options: ["Nguyễn Thiên Lý", "Hoàng Thị Ngọc Hạnh"]
      }
    };
  }
  static async getInitialProps({ req, query }) {
    return {};
  }

  fetchData = () => { };

  handleScroll = () => { };
  componentWillUnmount() { }
  componentDidMount() {
    this.fetchData();

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
      ".memberDetails .memberDetails__header .headerAdmin__wrapper"
    ).height();
    $(".memberDetails .memberDetails__body").css(
      "margin-top",
      heightOfHeader + "px"
    );
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
      <div className="memberDetails">
        <Head>
          <title>Member's Details</title>
          <meta name="title" content="Member's Details" />
          <meta
            name="description"
            content="Chi tiết học viên trung tâm yoga Hiệp Hòa"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <React.Fragment>
          <div className="memberDetails__header">
            <HeaderAdmin
              sidebar={this.state.categories}
              headerAdmin={this.state.headerAdmin}
              logo={this.props.setting.logo}
            ></HeaderAdmin>
          </div>
          <div className="memberDetails__sidebar">
            <Sidebar
              sidebar={this.state.categories}
              logo={this.props.setting.logo}
            ></Sidebar>
          </div>
          <div className="memberDetails__body">
            <div className="memberDetails__body__numbers">
              {this.state.numberAdmins.map(number => {
                return <NumberAdmin numberAdmin={number}></NumberAdmin>;
              })}
            </div>
            <div className="memberDetails__body__card">
              <div className="memberDetails__body__card__title">
                Thông tin học viên
              </div>
              <div className="memberDetails__body__card__content">
                <div className="memberDetails__body__card__content__member">
                  <div className="memberDetails__body__card__content__member__filter">
                    <CustomSelect
                      customSelect={this.state.customSelectMember}
                    ></CustomSelect>
                  </div>
                  <div className="memberDetails__body__card__content__member__info">
                    <MemberInfo></MemberInfo>
                  </div>
                </div>
              </div>
            </div>
            <div className="memberDetails__body__card">
              <div className="memberDetails__body__card__title">
                Thống kê khóa học
              </div>
              <div className="memberDetails__body__card__content">
                <div className="memberDetails__body__card__content__chart">
                  <div className="memberDetails__body__card__content__chart__filter">
                    <form className="memberDetails__body__card__content__chart__filter__form">
                      <input
                        type="text"
                        className="memberDetails__body__card__content__chart__filter__form__input"
                        placeholder="Chọn ngày bắt đầu"
                      />
                      <input
                        type="text"
                        className="memberDetails__body__card__content__chart__filter__form__input"
                        placeholder="Chọn ngày kết thúc"
                      />
                      <button
                        type="button"
                        className="memberDetails__body__card__content__chart__filter__form__btn memberDetails__body__card__content__chart__filter__form__btn--primary"
                      >
                        thống kê
                      </button>
                    </form>
                  </div>
                  <div className="memberDetails__body__card__content__chart__row">
                    <LineChart></LineChart>
                  </div>
                  <div className="memberDetails__body__card__content__chart__row">
                    <PieChart></PieChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="memberDetails__body__table">
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

export default connect(mapStateToProps)(MemberDetails);
