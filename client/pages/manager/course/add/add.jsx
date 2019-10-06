import * as React from 'react';
import Router from 'next/router'

import { StepsLine, TinymceEditor } from '../../../../components';

import Swal from 'sweetalert2';

import {
  AddCourseBenefitsModal,
  NewCourseInfo,
  ReviewAddCourse
} from './components';

import { action } from '../../../../actions';
import { api } from '../../../../services';

import './add.scss';

export class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          name: 'newCourseInfo',
          isValid: false
        },
        {
          name: 'tinymceEditor',
          isValid: false
        },
        {
          name: 'reviewAddCourse',
          isValid: true
        }
      ],
      curPageNumber: 1,
      isShowAddCourseBenefitsModal: false,
      formData: {
        name: '',
        slug: '',
        benefits: [],
        thumb: '',
        thumbUrl: '',
        description: '',
        shortDescription: ''
      }
    };
    this.hideAddCourseBenefitsModal = this.hideAddCourseBenefitsModal.bind(
      this
    );
    this.showAddCourseBenefitsModal = this.showAddCourseBenefitsModal.bind(
      this
    );

    this.canOpenPage = this.canOpenPage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleIsValid = this.handleIsValid.bind(this);
    this.handleInputForm = this.handleInputForm.bind(this);
    this.handleAddBenefits = this.handleAddBenefits.bind(this);
    this.handleRemoveBenefits = this.handleRemoveBenefits.bind(this);
    this.submitCourse = this.submitCourse.bind(this);
  }
  async componentDidMount() {
    var heightOfHeader = $(
      '.addCourse .addCourse__header .headerAdmin__wrapper'
    ).height();
    $('.addCourse .addCourse__body').css('margin-top', heightOfHeader + 'px');
  }

  shouldComponentUpdate() {
    return true;
  }

  canOpenPage = function() {
    const curPageNumber = this.state.curPageNumber;
    const pages = this.state.pages;

    if (!pages[curPageNumber - 1].isValid) {
      alert('Vui lòng kiểm tra lại thông tin');
      return false;
    }

    return true;
  };

  openPage = function(nextPageNumber) {
    const pages = this.state.pages;
    // set up page content
    var i, page, stepBtns;
    page = document.getElementsByClassName(
      'addCourse__body__card__content__info'
    );
    for (i = 0; i < page.length; i++) {
      page[i].style.display = 'none';
    }
    stepBtns = document.getElementsByClassName('stepsLine__btn');
    for (i = 0; i < stepBtns.length; i++) {
      stepBtns[i].style.backgroundColor = '#e1f2f4';
      stepBtns[i].style.color = '#00a3af';
    }
    document.getElementById(pages[nextPageNumber - 1].name).style.display =
      'block';
    $('.stepsLine__btn-' + nextPageNumber).css({
      backgroundColor: '#00a3af',
      color: '#fff'
    });

    // update curPageNumber
    this.setState({ curPageNumber: nextPageNumber });

    // set up for button previous, next
    if (nextPageNumber == this.state.pages.length) {
      $('.addCourse__body__card__buttons__btn-next').text('Xác nhận');
    } else {
      $('.addCourse__body__card__buttons__btn-next').html(
        "Tiếp theo<i class='fas fa-chevron-right'></i>"
      );
    }
    if (nextPageNumber == 1) {
      $('.addCourse__body__card__buttons__btn-previous').attr('disabled', true);
    } else {
      $('.addCourse__body__card__buttons__btn-previous').attr(
        'disabled',
        false
      );
    }
  };

  handleClickPrevious = function() {
    const curPageNumber = this.state.curPageNumber;
    let nextPageNumber = curPageNumber - 1;
    if (nextPageNumber > 0) {
      this.openPage(nextPageNumber);
    }
  };

  handleClickNext = function() {
    const curPageNumber = this.state.curPageNumber;
    const pages = this.state.pages;

    let nextPageNumber = curPageNumber + 1;
    if (nextPageNumber <= pages.length) {
      if (this.canOpenPage()) {
        this.openPage(nextPageNumber);
      }
    }
    if (nextPageNumber > pages.length) {
      this.submitCourse();
    }
  };

  handleIsValid = function(pageNumber, isValid) {
    const pages = this.state.pages;
    pages[pageNumber - 1].isValid = isValid;
    this.setState({ pages: pages });
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
    if (this.state.formData.thumb !== '') {
      imageLink = await api.imgur.uploadImage(this.state.formData.thumb);
      this.state.formData.thumb = imageLink;
    }
    api.course
      .create(this.state.formData, {
        headers: {
          'x-token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M'
        }
      })
      .then(async res => {
        await Swal.fire('Thành công', 'Thêm khoá học thành công', 'success');
        Router.push(`/manager/course/course?courseId=${res.result.object._id}`, `/quan-ly/khoa-hoc/chi-tiet/${res.result.object._id}`)
      })
      .catch(err => {
        console.log('err');
        Swal.fire('Thất bại', 'Thêm khoá học không thành công', 'error');
      });
  }

  render() {
    return (
      <div className="addCourse">
        <div className="addCourse__body">
          <AddCourseBenefitsModal
            show={this.state.isShowAddCourseBenefitsModal}
            hideModal={this.hideAddCourseBenefitsModal}
            handleAddBenefits={this.handleAddBenefits}
          />
          <div className="addCourse__body__card">
            <div className="addCourse__body__card__title">Thêm khóa học</div>
            <div className="addCourse__body__card__content">
              <div className="addCourse__body__card__content__steps">
                <StepsLine
                  stepQuantity={this.state.pages.length}
                  openPage={this.openPage}
                  canOpenPage={this.canOpenPage}
                  curPageNumber={this.state.curPageNumber}
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
                  handleIsValid={this.handleIsValid}
                  pageNumber="1"
                />
              </div>
              <div
                id="tinymceEditor"
                className="addCourse__body__card__content__info animated
                      fadeIn"
              >
                <TinymceEditor
                  handleChange={this.handleInputForm}
                  varName="description"
                  handleIsValid={this.handleIsValid}
                  pageNumber="2"
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
      </div>
    );
  }
}
