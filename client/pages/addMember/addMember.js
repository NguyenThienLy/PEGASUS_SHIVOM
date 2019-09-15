import React, { Component } from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import "./addMember.scss";
import {
  HeaderAdmin,
  Sidebar,
  NewMemberInfo,
  CourseOptions,
  StepsLine,
  TimeTableOptions,
  ReviewAddMember
} from "../../components";
import { StudentAction } from "../../actions/student";

class AddMember extends Component {
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
      pages: [
        "newMemberInfo",
        "courseOptions",
        "timeTableOptions",
        "reviewAddMember"
      ],
      curPageNumber: 1,
      formData: {
        memberInfo: {
          cardNumber: null,
          phone: null,
          point: null,
          firstName: null,
          lastName: null,
          birthday: null,
          address: null,
          avatar: null
        },
        courses: [],
        timeTables: [],
      }
    };
    this.openPage = this.openPage.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  openPage = function(pageNumber) {
    // set up page content
    var i, page, stepBtns;
    page = document.getElementsByClassName(
      "addMember__body__card__content__info"
    );
    for (i = 0; i < page.length; i++) {
      page[i].style.display = "none";
    }
    stepBtns = document.getElementsByClassName("stepsLine__btn");
    for (i = 0; i < stepBtns.length; i++) {
      stepBtns[i].style.backgroundColor = "#e1f2f4";
      stepBtns[i].style.color = "#00a3af";
    }
    document.getElementById(this.state.pages[pageNumber - 1]).style.display =
      "block";
    $(".stepsLine__btn-" + pageNumber).css({
      backgroundColor: "#00a3af",
      color: "#fff"
    });

    // update curPageNumber
    this.setState({ curPageNumber: pageNumber });

    // set up for button previous, next
    if (pageNumber == this.state.pages.length) {
      $(".addMember__body__card__buttons__btn-next").text("Xác nhận");
    } else {
      $(".addMember__body__card__buttons__btn-next").html(
        "Tiếp theo<i class='fas fa-chevron-right'></i>"
      );
    }
    if (pageNumber == 1) {
      $(".addMember__body__card__buttons__btn-previous").attr("disabled", true);
    } else {
      $(".addMember__body__card__buttons__btn-previous").attr(
        "disabled",
        false
      );
    }
  };

  handleClickPrevious = function() {
    let curPageNumber = this.state.curPageNumber - 1;
    if (curPageNumber > 0) {
      this.setState({ curPageNumber });
      this.openPage(curPageNumber);
    }
  };

  handleClickNext = function() {
    let curPageNumber = this.state.curPageNumber + 1;
    if (curPageNumber <= this.state.pages.length) {
      this.setState({ curPageNumber });
      this.openPage(curPageNumber);
    }
  };

  static async getInitialProps({ req, query }) {
    return {};
  }

  async componentDidMount() {
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
      ".addMember .addMember__header .headerAdmin__wrapper"
    ).height();
    $(".addMember .addMember__body").css("margin-top", heightOfHeader + "px");
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
  handleChange = (step, key, value) => {
    if(step === "memberInfo"){
      this.state.formData[step][key] = value
    } else {
      this.state.formData[step] = value
    }
    this.setState({ formData: this.state.formData })
  }
  render() {
    return (
      <div className="addMember">
        <Head>
          <title>Thêm học viên</title>
          <meta name="title" content="Thêm học viên" />
          <meta
            name="description"
            content="Thêm học viên tại trung tâm Yoga Hiệp Hòa"
          />
        </Head>

        <React.Fragment>
          <div className="background-overlay"></div>
          <div className="addMember__header">
            <HeaderAdmin
              sidebar={this.state.categories}
              headerAdmin={this.state.headerAdmin}
            ></HeaderAdmin>
          </div>
          <div className="addMember__sidebar">
            <Sidebar sidebar={this.state.categories}></Sidebar>
          </div>
          <div className="addMember__body">
            <div className="addMember__body__card">
              <div className="addMember__body__card__title">Thêm học viên</div>
              <div className="addMember__body__card__content">
                <div className="addMember__body__card__content__steps">
                  <StepsLine
                    stepQuantity={this.state.pages.length}
                    pages={this.state.pages}
                    openPage={this.openPage}
                  ></StepsLine>
                </div>
                <div
                  id="newMemberInfo"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <NewMemberInfo  handleChange={this.handleChange}/>
                </div>
                <div
                  id="courseOptions"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <CourseOptions />
                </div>
                <div
                  id="timeTableOptions"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <TimeTableOptions></TimeTableOptions>
                </div>
                <div
                  id="reviewAddMember"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <ReviewAddMember />
                </div>
              </div>
              <div className="addMember__body__card__buttons">
                <button
                  className="addMember__body__card__buttons__btn addMember__body__card__buttons__btn-previous"
                  onClick={this.handleClickPrevious}
                >
                  <i className="fas fa-chevron-left"></i>Quay lại
                </button>
                <button
                  className="addMember__body__card__buttons__btn addMember__body__card__buttons__btn-next"
                  onClick={this.handleClickNext}
                >
                  Tiếp tục<i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            {/* <div className="addMember__body__card">
              <div className="addMember__body__card__title">Thêm học viên</div>
              <div className="addMember__body__card__content">
                <div className="addMember__body__card__content__steps">
                  <StepsLine></StepsLine>
                </div>
                <div className="addMember__body__card__content__info">
                  <CourseOptions />
                </div>
              </div>
            </div>
            <div className="addMember__body__card">
              <div className="addMember__body__card__title">Thêm học viên</div>
              <div className="addMember__body__card__content">
                <div className="addMember__body__card__content__steps">
                  <StepsLine></StepsLine>
                </div>
                <div className="addMember__body__card__content__info">
                  <TimeTableOptions></TimeTableOptions>
                </div>
              </div>
            </div>
            <div className="addMember__body__card">
              <div className="addMember__body__card__title">Thêm học viên</div>
              <div className="addMember__body__card__content">
                <div className="addMember__body__card__content__steps">
                  <StepsLine></StepsLine>
                </div>
                <div className="addMember__body__card__content__info">
                  <ReviewAddMember />
                </div>
              </div>
            </div> */}
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(AddMember);
