import React, { Component } from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../../services";
import { action } from "../../../actions";
import Swal from "sweetalert2";

import "./addCourse.scss";
import {
  HeaderAdmin,
  Sidebar,
  NewCourseInfo,
  StepsLine,
  TinymceEditor,
  ReviewAddCourse,
  AdminSidebar
} from "../../../components";
import { AddCourseBenefitsModal } from "./components/addCourseBenefitsModal/addCourseBenefitsModal";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerAdmin: {
        avatar:
          "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
        name: "Avril Lavigne"
      },
      
      pages: ["newCourseInfo", "tinymceEditor", "reviewAddCourse"],
      curPageNumber: 1,
      isShowAddCourseBenefitsModal: false,
      formData: {
        name: "",
        slug: "",
        benefits: [],
        thumb: "",
        thumbUrl: "",
        description: "",
        shortDescription: ""
      }
    };
    this.hideAddCourseBenefitsModal = this.hideAddCourseBenefitsModal.bind(
      this
    );
    this.showAddCourseBenefitsModal = this.showAddCourseBenefitsModal.bind(
      this
    );

    this.openPage = this.openPage.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleInputForm = this.handleInputForm.bind(this);
    this.handleAddBenefits = this.handleAddBenefits.bind(this);
    this.handleRemoveBenefits = this.handleRemoveBenefits.bind(this);
    this.submitCourse = this.submitCourse.bind(this);
  }
  async componentDidMount() {
   
    var heightOfHeader = $(
      ".addCourse .addCourse__header .headerAdmin__wrapper"
    ).height();
    $(".addCourse .addCourse__body").css("margin-top", heightOfHeader + "px");
  }

  shouldComponentUpdate() {
    return true;
  }
  openPage = function(pageNumber) {
    // set up page content
    var i, page, stepBtns;
    page = document.getElementsByClassName(
      "addCourse__body__card__content__info"
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
      $(".addCourse__body__card__buttons__btn-next").text("Xác nhận");
    } else {
      $(".addCourse__body__card__buttons__btn-next").html(
        "Tiếp theo<i class='fas fa-chevron-right'></i>"
      );
    }
    if (pageNumber == 1) {
      $(".addCourse__body__card__buttons__btn-previous").attr("disabled", true);
    } else {
      $(".addCourse__body__card__buttons__btn-previous").attr(
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
    if (curPageNumber > this.state.pages.length) {
      this.submitCourse();
    }
  };

  static async getInitialProps({ req, query }) {
    return {};
  }

  hideAddCourseBenefitsModal() {
    this.setState({ isShowAddCourseBenefitsModal: false });
  }
  showAddCourseBenefitsModal() {
    this.setState({ isShowAddCourseBenefitsModal: true });
  }

  

  handleInputForm(name, value) {
    this.state.formData[name] = value;
    this.setState({ formData: this.state.formData });
  }
  handleAddBenefits = function(body) {
    this.state.formData.benefits.push(body.name);
    this.setState({ formData: this.state.formData });
  };
  handleRemoveBenefits(index) {
    this.state.formData.benefits.splice(index, 1);
    this.setState({ formData: this.state.formData });
  }

  async submitCourse() {
    Swal.showLoading();
    let imageLink;
    if (this.state.formData.thumb !== "") {
      imageLink = await api.imgur.uploadImage(this.state.formData.thumb);
      this.state.formData.thumb = imageLink;
    }
    api.course
      .create(this.state.formData, {
        headers: {
          "x-token":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
        }
      })
      .then(res => {
        Swal.fire("Thành công", "Thêm khoá học thành công", "success");
      })
      .catch(err => {
        console.log("err");
        Swal.fire("Thất bại", "Thêm khoá học không thành công", "error");
      });
  }
  render() {
    return (
      <div className="addCourse">
        <AddCourseBenefitsModal
          show={this.state.isShowAddCourseBenefitsModal}
          hideModal={this.hideAddCourseBenefitsModal}
          handleAddBenefits={this.handleAddBenefits}
        />

        <Head>
          <title>Thêm khoá học</title>
          <meta name="robots" content="noindex"/>
          <meta name="title" content="Thêm khóa học" />
          <meta
            name="description"
            content="Thêm khóa học tại trung tâm Yoga Hiệp Hòa"
          />
        </Head>

        <React.Fragment>
          <div className="background-overlay"></div>
          <div className="addCourse__header">
            <HeaderAdmin
              sidebar={this.state.categories}
              headerAdmin={this.state.headerAdmin}
            ></HeaderAdmin>
          </div>
          <div className="addCourse__sidebar">
            <AdminSidebar />
          </div>
          <div className="addCourse__body">
            <div className="addCourse__body__card">
              <div className="addCourse__body__card__title">Thêm khóa học</div>
              <div className="addCourse__body__card__content">
                <div className="addCourse__body__card__content__steps">
                  <StepsLine
                    stepQuantity={this.state.pages.length}
                    pages={this.state.pages}
                    openPage={this.openPage}
                  ></StepsLine>
                </div>
                <div
                  id="newCourseInfo"
                  className="addCourse__body__card__content__info animated
                  fadeIn"
                >
                  <NewCourseInfo
                    courseBenefits={this.state.formData.benefits}
                    showAddCourseBenefitsModal={this.showAddCourseBenefitsModal}
                    handleChange={this.handleInputForm}
                    handleRemove={this.handleRemoveBenefits}
                  />
                </div>
                <div
                  id="tinymceEditor"
                  className="addCourse__body__card__content__info animated
                  fadeIn"
                >
                  <TinymceEditor
                    handleChange={this.handleInputForm} varName="description"
                  ></TinymceEditor>
                </div>
                <div
                  id="reviewAddCourse"
                  className="addCourse__body__card__content__info animated
                  fadeIn"
                >
                  <ReviewAddCourse data={this.state.formData} />
                </div>
              </div>
              <div className="addCourse__body__card__buttons">
                <button
                  className="addCourse__body__card__buttons__btn addCourse__body__card__buttons__btn-previous"
                  onClick={this.handleClickPrevious}
                >
                  <i className="fas fa-chevron-left"></i>Quay lại
                </button>
                <button
                  className="addCourse__body__card__buttons__btn addCourse__body__card__buttons__btn-next"
                  onClick={this.handleClickNext}
                >
                  Tiếp tục<i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            {/* <div className="addCourse__body__card">
              <div className="addCourse__body__card__title">Thêm khóa học</div>
              <div className="addCourse__body__card__content">
                <div className="addCourse__body__card__content__steps">
                  <StepsLine></StepsLine>
                </div>
                <div className="addCourse__body__card__content__info">
                  <TinymceEditor></TinymceEditor>
                </div>
              </div>
            </div>
            <div className="addCourse__body__card">
              <div className="addCourse__body__card__title">Thêm khóa học</div>
              <div className="addCourse__body__card__content">
                <div className="addCourse__body__card__content__steps">
                  <StepsLine></StepsLine>
                </div>
                <div className="addCourse__body__card__content__info">
                  <ReviewAddCourse />
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

export default connect(mapStateToProps)(AddCourse);
