import * as React from 'react';
import * as moment from 'moment';
import Router from 'next/router';
import {
  NewMemberInfo,
  CourseOptions,
  StepsLine,
  TimeTableOptions,
  ReviewAddMember
} from '../../../../components';

import { action } from '../../../../actions';
import { api } from '../../../../services';

import Swal from 'sweetalert2';
import './add.scss';
export class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          isValid: false
        },
        {
          isValid: false
        },
        {
          isValid: true
        },
        {
          isValid: true
        }
      ],
      curPageNumber: 1,
      isAdding: false,
      formData: {
        personalInfo: {
          cardId: '',
          phone: '',
          point: 0,
          firstName: '',
          lastName: '',
          birthday: moment().format(),
          address: '',
          avatar: '',
          avatarUrl: ''
        },
        courses: [],
        isPayFee: false
      }
    };
    this.canOpenPage = this.canOpenPage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleIsValid = this.handleIsValid.bind(this);
    this.submitEnroll = this.submitEnroll.bind(this);
  }

  async componentDidMount() {
    this.fetchData();

    var heightOfHeader = $(
      '.addMember .addMember__header .headerAdmin__wrapper'
    ).height();
    $('.addMember .addMember__body').css('margin-top', heightOfHeader + 'px');
  }

  canOpenPage = function () {
    const curPageNumber = this.state.curPageNumber;
    const pages = this.state.pages;

    if (!pages[curPageNumber - 1].isValid) {
      alert('Vui lòng kiểm tra lại thông tin');
      return false;
    }

    return true;
  };

  openPage = function(nextPageNumber) {
    // update curPageNumber
    this.setState({ curPageNumber: nextPageNumber });
  };

  handleClickPrevious = function () {
    const curPageNumber = this.state.curPageNumber;
    const nextPageNumber = curPageNumber - 1;
    if (nextPageNumber > 0) {
      this.openPage(nextPageNumber);
    }
  };

  handleClickNext = function () {
    const curPageNumber = this.state.curPageNumber;
    const pages = this.state.pages;

    const nextPageNumber = curPageNumber + 1;
    if (nextPageNumber <= pages.length) {
      if (this.canOpenPage()) {
        this.openPage(nextPageNumber);
      }
    }
    if (nextPageNumber > pages.length) {
      this.submitEnroll();
    }
  };

  handleIsValid = function (pageNumber, isValid) {
    const pages = this.state.pages;
    pages[pageNumber - 1].isValid = isValid;
    this.setState({ pages: pages });
  };

  static async getInitialProps({ req, query }) {
    return {};
  }
  fetchData() { }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps, prevState) { }
  handleChange = (step, key, value) => {
    const formData = this.state.formData
    // if (step === 'personalInfo') {
    //   this.state.formData[step][key] = value;
    // }
    // this.setState({ formData: this.state.formData });
    if (step === 'personalInfo') {
      formData[step][key] = value;
    }
    this.setState({ formData: formData });
  };
  handleSelectCoursePackage = (courseId, packageId) => {
    console.log("vao day", courseId)
    const formData = this.state.formData
    const courseIndex = formData.courses.findIndex(course => {
      return courseId === course._id;
    });
    const packageData = this.props.package.items.find(packageData => {
      return packageData._id === packageId;
    });
    if (courseIndex === -1) {
      formData.courses.push({
        _id: courseId,
        package: packageId,
        timeTables: [],
        price: packageData.price,
        type: 'package'
      });
    } else {
      if (packageId === formData.courses[courseIndex].package) {
        formData.courses.splice(courseIndex, 1);
      } else {
        formData.courses[courseIndex] = {
          _id: courseId,
          package: packageId,
          timeTables: formData.courses[courseIndex].timeTables,
          price: packageData.price,
          type: 'package'
        };
      }
    }
    this.setState(() => { formData: formData });

    // const courseIndex = this.state.formData.courses.findIndex(cåourse => {
    //   return courseId === course._id;
    // });
    // const packageData = this.props.package.items.find(packageData => {
    //   return packageData._id === packageId;
    // });
    // if (courseIndex === -1) {
    //   this.state.formData.courses.push({
    //     _id: courseId,
    //     package: packageId,
    //     timeTables: [],
    //     price: packageData.price,
    //     type: 'package'
    //   });
    // } else {
    //   if (packageId === this.state.formData.courses[courseIndex].package) {
    //     this.state.formData.courses.splice(courseIndex, 1);
    //   } else {
    //     this.state.formData.courses[courseIndex] = {
    //       _id: courseId,
    //       package: packageId,
    //       timeTables: this.state.formData.courses[courseIndex].timeTables,
    //       price: packageData.price,
    //       type: 'package'
    //     };
    //   }
    // }
    // console.log("course : ", this.state.formData.courses)
    // this.setState({ formData: this.state.formData });
  };
  handleInputCourseMonthAmount = (courseId, monthAmount) => {
    console.log("select course amount")
    const courseIndex = this.state.formData.courses.findIndex(course => {
      return courseId === course._id;
    });
    const courseData = this.props.courses.items.find(courseData => {
      return courseData._id === courseId;
    });
    if (monthAmount === 0 && courseIndex !== -1) {
      this.state.formData.courses.splice(courseIndex, 1);
    } else if (courseIndex === -1) {
      this.state.formData.courses.push({
        _id: courseId,
        monthAmount: monthAmount,
        timeTables: [],
        price: courseData.pricePerMonth * monthAmount,
        type: 'monthAmount'
      });
    } else if (courseIndex !== -1) {
      this.state.formData.courses[courseIndex] = {
        _id: courseId,
        monthAmount: monthAmount,
        timeTables: this.state.formData.courses[courseIndex].timeTables,
        price: courseData.pricePerMonth * monthAmount,
        type: 'monthAmount'
      };
    }
    this.setState({ formData: this.state.formData });
  };
  handleChooseTimeTableItem = (courseId, timeTableItemId) => {
    const courseIndex = this.state.formData.courses.findIndex(course => {
      return courseId === course._id;
    });
    const timeTableItemIndex = this.state.formData.courses[
      courseIndex
    ].timeTables.findIndex(timeTableItem => {
      return timeTableItemId === timeTableItem;
    });
    if (timeTableItemIndex === -1) {
      this.state.formData.courses[courseIndex].timeTables.push(timeTableItemId);
    } else {
      this.state.formData.courses[courseIndex].timeTables.splice(
        timeTableItemIndex,
        1
      );
    }
    this.setState({ formData: this.state.formData });
  };
  async submitEnroll() {

    Swal.showLoading();
    let imageLink;
    if (this.state.formData.personalInfo.avatar !== '') {
      imageLink = await api.imgur.uploadImage(
        this.state.formData.personalInfo.avatar
      );
      this.state.formData.personalInfo.avatar = imageLink;
    } else {
      imageLink = 'https://i.imgur.com/KLKaw6K.png';
    }
    this.state.formData.personalInfo.birthday = moment(
      this.state.formData.personalInfo.birthday
    ).format();
    api.student
      .enroll(this.state.formData, {
        headers: {
          'x-token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M'
        }
      })
      .then(async res => {
        await Swal.fire('Thành công', 'Thêm học viên thành công', 'success');
        Router.push(
          `/manager/member/member?studentId=${res.result.object._id}`,
          `/quan-ly/hoc-vien/chi-tiet/${res.result.object._id}`
        );
      })
      .catch(err => {
        console.log('err');
        Swal.fire('Thất bại', 'Thêm học viên không thành công', 'error');
      });
  }
  render() {
    return (
      <div className="addMember">
        <div className="addMember__body">
          <div className="addMember__body__card">
            <div className="addMember__body__card__title">Thêm học viên</div>
            <div className="addMember__body__card__content">
              <div className="addMember__body__card__content__steps">
                <StepsLine
                  stepQuantity={this.state.pages.length}
                  openPage={this.openPage}
                  canOpenPage={this.canOpenPage}
                  curPageNumber={this.state.curPageNumber}
                ></StepsLine>
              </div>

              <div
                style={
                  this.state.curPageNumber === 1
                    ? { display: 'block' }
                    : { display: 'none' }
                }
                className="addMember__body__card__content__info animated fadeIn"
              >
                <NewMemberInfo
                  handleChange={this.handleChange}
                  handleIsValid={this.handleIsValid}
                  pageNumber="1"
                />
              </div>

              <div
                style={
                  this.state.curPageNumber === 2
                    ? { display: 'block' }
                    : { display: 'none' }
                }
                className="addMember__body__card__content__info animated fadeIn"
              >
                <CourseOptions
                  courses={this.props.courses.items}
                  packages={this.props.package.items}
                  selectedCourses={this.state.formData.courses}
                  handleSelectCoursePackage={this.handleSelectCoursePackage}
                  handleInputCourseMonthAmount={
                    this.handleInputCourseMonthAmount
                  }
                  handleIsValid={this.handleIsValid}
                  pageNumber="2"
                />
              </div>

              <div
                style={
                  this.state.curPageNumber === 3
                    ? { display: 'block' }
                    : { display: 'none' }
                }
                className="addMember__body__card__content__info animated fadeIn"
              >
                <TimeTableOptions
                  courses={this.state.formData.courses}
                  handleChooseTimeTableItem={this.handleChooseTimeTableItem}
                  handleIsValid={this.handleIsValid}
                  pageNumber="3"
                ></TimeTableOptions>
              </div>

              <div
                style={
                  this.state.curPageNumber === 4
                    ? { display: 'block' }
                    : { display: 'none' }
                }
                className="addMember__body__card__content__info animated fadeIn"
              >
                <ReviewAddMember
                  data={this.state.formData}
                  courses={this.props.courses.items}
                  handleCheckIsPayFee={() => {
                    console.log("is Pay Fee")
                    this.state.formData.isPayFee = !this.state.formData.isPayFee
                    this.setState({
                      formData: this.state.formData
                    })
                  }}
                />
              </div>
            </div>
            <div className="addMember__body__card__buttons">
              {this.state.curPageNumber === 1 ? (
                <button
                  disabled="true"
                  className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-previous"
                  onClick={this.handleClickPrevious}
                >
                  <i className="fas fa-chevron-left"></i>Quay lại
                </button>
              ) : (
                <button
                  disabled="false"
                  className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-previous"
                  onClick={this.handleClickPrevious}
                >
                  <i className="fas fa-chevron-left"></i>Quay lại
                </button>
              )}

              {this.state.curPageNumber === this.state.pages.length ? (
                <button
                  className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-next"
                  onClick={this.handleClickNext}
                >
                  Xác nhận
                </button>
              ) : (
                <button
                  className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-next"
                  onClick={this.handleClickNext}
                  dangerouslySetInnerHTML={{
                    __html: 'Tiếp theo<i className="fas fa-chevron-right"></i>'
                  }}
                ></button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
