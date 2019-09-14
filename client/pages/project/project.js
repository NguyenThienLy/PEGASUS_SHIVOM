import React, { Component } from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import "./project.scss";
import {
  HeaderAdmin,
  Sidebar,
  NewMemberInfo,
  CourseOptions,
  StepsLine,
  TimeTableOptions,
  ReviewAddMember
} from "../../components/";
import { StudentAction } from "../../actions/student";

class Project extends Component {
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
      ]
    };
  }

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
                  <StepsLine></StepsLine>
                </div>
                <div className="addMember__body__card__content__info">
                  <NewMemberInfo />
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

export default connect(mapStateToProps)(Project);
