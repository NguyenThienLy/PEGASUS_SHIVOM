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
  ProfileAdmin,
  CourseInfo
} from "../../components";

export class CourseDetails extends React.Component {
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

  fetchData = () => {
    // Cách 1
    // if (!this.props.setting.fetched) {
    //   this.props.fetchSetting();
    // }
    // Luôn luôn phải catch lỗi và xử lý nhằm tránh crash web
    // Cách 2
    // api.class.getList()
    //   .then(result => {
    //     console.log("result: ", result)
    //   })
    //   .catch(err => {
    //     console.log("Err: ", err)
    //   })
    // // Cách 3
    // try {
    //   const result = await api.class.getList();
    // } catch (err) { }
  };

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
      ".courseDetails .courseDetails__header .headerAdmin__wrapper"
    ).height();
    $(".courseDetails .courseDetails__body").css(
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
              sidebar={this.state.categories}
              headerAdmin={this.state.headerAdmin}
              logo={this.props.setting.logo}
            ></HeaderAdmin>
          </div>
          <div className="courseDetails__sidebar">
            <Sidebar
              sidebar={this.state.categories}
              logo={this.props.setting.logo}
            ></Sidebar>
          </div>
          <div className="courseDetails__body">
            <div className="courseDetails__body__numbers">
              {this.state.numberAdmins.map((number, index) => {
                return <NumberAdmin numberAdmin={number} key={index}></NumberAdmin>;
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
