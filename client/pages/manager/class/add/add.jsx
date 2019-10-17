import * as React from 'react';
import { StepsLine } from '../../../../components';

import { action } from '../../../../actions';
import { api } from '../../../../services';

import {
  AddClassTimeModal,
  NewClassInfo,
  NewClassTimetable,
  ReviewAddClass
} from './components';

import Swal from 'sweetalert2';

import './add.scss';

export class AddClass extends React.Component {
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
        }
      ],
      curPageNumber: 1,
      isShowAddClassTimeModal: false,
      timeTable: [],
      formData: {
        name: '',
        course: null,
        shortDescription: '',
        description: '',
        quantity: 0,
        teacher: null
      },
      classId: null
    };
    this.hideAddClassTimeModal = this.hideAddClassTimeModal.bind(this);
    this.showAddClassTimeModal = this.showAddClassTimeModal.bind(this);

    this.canOpenPage = this.canOpenPage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleIsValid = this.handleIsValid.bind(this);
    this.handleInputForm = this.handleInputForm.bind(this);
    this.handleAddClassTime = this.handleAddClassTime.bind(this);
    this.handleRemoveClassTimes = this.handleRemoveClassTimes.bind(this);
    this.submitClass = this.submitClass.bind(this);
  }

  async componentDidMount() {
    this.fetchData();
    var heightOfHeader = $(
      '.add-class .add-class__header .headerAdmin__wrapper'
    ).height();
    $('.add-class .add-class__body').css('margin-top', heightOfHeader + 'px');
  }

  componentWillReceiveProps() {
    this.openPage(this.state.curPageNumber);
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
    // update curPageNumber
    this.setState({ curPageNumber: nextPageNumber });
  };

  handleClickPrevious = function() {
    const curPageNumber = this.state.curPageNumber;
    const nextPageNumber = curPageNumber - 1;
    if (nextPageNumber > 0) {
      this.openPage(nextPageNumber);
    }
  };

  handleClickNext = async () => {
    const curPageNumber = this.state.curPageNumber;
    const pages = this.state.pages;

    const nextPageNumber = curPageNumber + 1;
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

  hideAddClassTimeModal() {
    this.setState({ isShowAddClassTimeModal: false });
  }
  showAddClassTimeModal() {
    this.setState({ isShowAddClassTimeModal: true });
  }
  fetchData() {}

  handleInputForm(name, value) {
    this.state.formData[name] = value;
    this.setState({ formData: this.state.formData });
  }
  handleAddClassTime = function(body) {
    if (!this.state.classId) {
      Swal.fire(
        'Chưa tạo lớp học',
        'Vui lòng quay lại bước trước tạo lớp học trước khi thêm thời khoá biểu',
        'warning'
      );
    } else {
      Swal.showLoading();
      api.class
        .addTimeTableItem(this.state.classId, body, {
          headers: {
            'x-token':
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M'
          }
        })
        .then(res => {
          body._id =
            res.result.object.items[res.result.object.items.length - 1];
          this.state.timeTable.push(body);
          this.setState({ timeTable: this.state.timeTable });
          this.handleIsValid(2, true); // validate
          Swal.fire('Thành công', 'Thêm thời khoá biểu thành công', 'success');
        })
        .catch(err => {
          console.log('ERR: ', err);
          Swal.fire('Thất bại', 'Thêm thời khoá biểu thất bại', 'error');
        });
    }
  };
  handleRemoveClassTimes(index) {
    Swal.showLoading();
    api.class
      .deleteTimeTableItem(
        this.state.classId,
        this.state.timeTable[index]._id,
        {
          headers: {
            'x-token':
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M'
          }
        }
      )
      .then(res => {
        this.state.timeTable.splice(index, 1);
        const timeTableLength = this.state.timeTable.length > 0;
        this.setState({ timeTable: this.state.timeTable });
        this.handleIsValid(2, timeTableLength); // validate
        Swal.fire('Thành công', 'Xoá thời khoá biểu thành công', 'success');
      })
      .catch(err => {
        Swal.fire('Thất bại', 'Xoá thời khoá biểu thất bại', 'error');
      });
  }
  async submitClass() {
    Swal.showLoading();
    try {
      const res = await api.class.create(this.state.formData, {
        headers: {
          'x-token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M'
        }
      });
      this.setState({ classId: res.result.object._id });
      Swal.fire('Thành công', 'Thêm lớp học thành công', 'success');
    } catch (err) {
      console.log('err');
      Swal.fire('Thất bại', 'Thêm lớp học không thành công', 'error');
    }
  }

  render() {
    return (
      <div className="add-class">
        <div className="add-class__body">
          <AddClassTimeModal
            show={this.state.isShowAddClassTimeModal}
            hideModal={this.hideAddClassTimeModal}
            handleAddClassTime={this.handleAddClassTime}
            rooms={this.props.room.items}
          />
          <div className="add-class__body__card">
            <div className="add-class__body__card__title">Thêm lớp học</div>
            <div className="add-class__body__card__content">
              <div className="add-class__body__card__content__steps">
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
                className="add-class__body__card__content__info animated fadeIn"
              >
                <NewClassInfo
                  handleChange={this.handleInputForm}
                  courses={this.props.courses.items}
                  teachers={this.props.teachers.items}
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
                className="add-class__body__card__content__info animated fadeIn"
              >
                <NewClassTimetable
                  timeTable={this.state.timeTable}
                  showAddClassTimeModal={this.showAddClassTimeModal}
                  handleRemove={this.handleRemoveClassTimes}
                  handleIsValid={this.handleIsValid}
                  pageNumber="2"
                ></NewClassTimetable>
              </div>

              <div
                style={
                  this.state.curPageNumber === 3
                    ? { display: 'block' }
                    : { display: 'none' }
                }
                className="add-class__body__card__content__info animated fadeIn"
              >
                <ReviewAddClass data={this.state.formData} />
              </div>
            </div>

            <div className="add-class__body__card__buttons">
              {this.state.curPageNumber === 1 ? (
                <button
                  disabled
                  className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-previous"
                  onClick={this.handleClickPrevious}
                >
                  <i className="fas fa-chevron-left"></i>Quay lại
                </button>
              ) : (
                <button
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
