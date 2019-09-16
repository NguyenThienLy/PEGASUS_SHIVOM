import React, { Component } from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import { bindActionCreators } from 'redux'

import Swal from 'sweetalert2'
import * as moment from 'moment'

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
      isAdding: false,
      formData: {
        personalInfo: {
          cardId: "",
          phone: "",
          point: 0,
          firstName: "",
          lastName: "",
          birthday: moment().format(),
          address: "",
          avatar: ""
        },
        courses: []
      }
    };
    this.openPage = this.openPage.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.submitEnroll = this.submitEnroll.bind(this)
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
        $(".addMember__body__card__buttons__btn-next")
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
    if(curPageNumber > this.state.pages.length){
        this.submitEnroll()
    }
  };

  static async getInitialProps({ req, query }) {
    return {};
  }
  fetchData(){
    this.props.fetchCourse({
      query: {
        limit: 0
      }
    })
    this.props.fetchPackage({
      query: {
        limit: 0
      }
    })
  }
  async componentDidMount() {
    
    this.fetchData()
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
    if(step === "personalInfo"){
      this.state.formData[step][key] = value
    } 
    this.setState({ formData: this.state.formData })
  }
  handleSelectCoursePackage = (courseId, packageId) => {
    const courseIndex = this.state.formData.courses.findIndex((course) => { return courseId === course._id })
    const packageData = this.props.package.items.find((packageData) => { return packageData._id === packageId})
    if(courseIndex === -1 ){
      this.state.formData.courses.push({
        _id: courseId, package: packageId, timeTables: [], price: packageData.price, type: "package"
      })
    } else {
      if(packageId === this.state.formData.courses[courseIndex].package){
        this.state.formData.courses.splice(courseIndex,1)
      } else {
        this.state.formData.courses[courseIndex] = {
          _id: courseId, package: packageId, timeTables: this.state.formData.courses[courseIndex].timeTables, price: packageData.price,type: "package"
        }
      }
    }
    this.setState({ formData: this.state.formData })
  }
  handleInputCourseMonthAmount = (courseId, monthAmount) => {
    
    const courseIndex = this.state.formData.courses.findIndex((course) => { return courseId === course._id })
    const courseData = this.props.courses.items.find((courseData) => { return courseData._id === courseId})
    if(monthAmount === 0 && courseIndex !== -1){
      this.state.formData.courses.splice(courseIndex,1)
    } else if (courseIndex === -1 ){
      
      this.state.formData.courses.push({
        _id: courseId, monthAmount: monthAmount, timeTables: [], price: courseData.pricePerMonth*monthAmount,type: "monthAmount"
      })
    } else if (courseIndex !== -1 ){
      this.state.formData.courses[courseIndex] = {
        _id: courseId, monthAmount: monthAmount, timeTables: this.state.formData.courses[courseIndex].timeTables, price: courseData.pricePerMonth*monthAmount, type: "monthAmount"
      }
    }
    this.setState({ formData: this.state.formData })
  }
  handleChooseTimeTableItem = (courseId, timeTableItemId) => {
    const courseIndex = this.state.formData.courses.findIndex((course) => { return courseId === course._id })
    const timeTableItemIndex = this.state.formData.courses[courseIndex].timeTables.findIndex((timeTableItem) => { return timeTableItemId === timeTableItem })
    if(timeTableItemIndex === -1 ){
      this.state.formData.courses[courseIndex].timeTables.push(timeTableItemId)
    } else {
      this.state.formData.courses[courseIndex].timeTables.splice(timeTableItemIndex,1)
    }
    this.setState({ formData: this.state.formData })
  }
  async submitEnroll(){
    Swal.showLoading()
    let imageLink
    if (this.state.formData.personalInfo.avatar !== "") {
      imageLink = await api.imgur.uploadImage(this.state.formData.personalInfo.avatar)
      this.state.formData.personalInfo.avatar = imageLink
    }
    this.state.formData.personalInfo.birthday = moment(this.state.formData.personalInfo.birthday).format()
    api.student.enroll(this.state.formData, {
      headers: {
        "x-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
      }
    }).then(res => {
      
      Swal.fire("Thành công", "Thêm học viên thành công", "success");
    })
    .catch(err => {

      console.log("err")
      Swal.fire("Thất bại", "Thêm học viên không thành công", "error");
    })
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
          <meta name="robots" content="noindex"/>
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
                  <CourseOptions courses={this.props.courses.items} packages={this.props.package.items} handleSelectCoursePackage={this.handleSelectCoursePackage} handleInputCourseMonthAmount={this.handleInputCourseMonthAmount}/>
                </div>
                <div
                  id="timeTableOptions"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <TimeTableOptions courses={this.state.formData.courses} handleChooseTimeTableItem={this.handleChooseTimeTableItem}></TimeTableOptions>
                </div>
                <div
                  id="reviewAddMember"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <ReviewAddMember data={this.state.formData} courses={this.props.courses.items}/>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCourse: action.course.fetch,
  fetchPackage: action.package.fetch
}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(AddMember);
