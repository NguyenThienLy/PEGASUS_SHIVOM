import * as React from 'react';
import { action } from '../../../../actions';
import { api } from '../../../../services';

import { CreatePackage } from './components';

import Swal from 'sweetalert2';
import {
  Sidebar,
  CourseInfo,
  LoadingSmall
} from '../../../../components';
import * as moment from 'moment';
import './detail.scss';
import { tsTupleType } from '@babel/types';

export class DetailCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        isFetching: true,
        isEmpty: true,
        data: null
      },
      timeTableOfCourse: {
        isFetching: true,
        isEmpty: true,
        data: null
      },
      packageOfCourse: {
        isFetching: true,
        isEmpty: true,
        data: null
      },
      modals: {
        createPackage: false
      }
    };
    this.showHideModal = this.showHideModal.bind(this);
    this.createPackage = this.createPackage.bind(this);
    this.deletePackageOfCourse = this.deletePackageOfCourse.bind(this)
  }
  showHideModal(key) {
    this.state.modals[key] = !this.state.modals[key];
    this.setState({ modals: this.state.modals });
  }

  async createPackage(body) {
    Swal.showLoading();
    body.course = this.props.params.courseId;
    body.priceBeforeDiscount = body.price + body.discount;
    body.discount = {
      type: 'amount',
      amount: body.discount
    };
    api.package
      .create(body, {
        headers: {
          'x-token': localStorage.getItem('token')
        }
      })
      .then(res => {

        Swal.fire('Thành công', 'Tạo gói cho khoá học thành công', 'success');
        this.state.packageOfCourse.data.push(res.result.object)
        this.setState({
          packageOfCourse: this.state.packageOfCourse
        })
      })
      .catch(err => {
        Swal.fire('Thất bại', 'Tạo gói cho khoá học thất bại', 'error');
      });
  }
  async deletePackageOfCourse(packageId) {
    Swal.showLoading();

    api.package
      .delete(packageId, {
        headers: {
          'x-token': localStorage.getItem('token')
        }
      })
      .then(res => {

        Swal.fire('Thành công', 'Xoá gói của khoá học thành công', 'success');
        const packageIndex = this.state.packageOfCourse.data.findIndex((packageData) => {
          return packageData._id === packageId
        })
        this.state.packageOfCourse.data.splice(packageIndex, 1)
        this.setState({
          packageOfCourse: this.state.packageOfCourse
        })
      })
      .catch(err => {
        Swal.fire('Thất bại', 'Xoá gói của khoá học thất bại', 'error');
      });
  }

  fetchData = async () => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M';

    if (this.state.course.isFetching) {
      const newCourse = this.state.course;

      newCourse.data = this.props.courses.items.find(course => {
        return course._id === this.props.params.courseId;
      });

      if (!newCourse.data) {
        const res = await api.course.getItem(this.props.params.courseId);
        newCourse.data = res.result.object;
      }

      newCourse.isFetching = false;
      newCourse.isEmpty = false;

      this.setState({ course: newCourse });
    }

    if (this.state.timeTableOfCourse.isFetching) {
      api.course.getTimeTableOfCourse(
        this.props.params.courseId
        , {
          query: {
            isRefresh: true
          }
        }).then(res => {
          const newTimeTableOfCourse = this.state.timeTableOfCourse;

          newTimeTableOfCourse.data = res.result.object;

          newTimeTableOfCourse.isFetching = false;
          newTimeTableOfCourse.isEmpty = false;

          this.setState({ timeTableOfCourse: newTimeTableOfCourse });

        }).catch(err => {
          const newTimeTableOfCourse = this.state.timeTableOfCourse;

          newTimeTableOfCourse.isFetching = false;
          newTimeTableOfCourse.isEmpty = true;

          this.setState({ timeTableOfCourse: newTimeTableOfCourse });
        })
    }

    if (this.state.packageOfCourse.isFetching) {
      api.package.getList(
        {
          query: {
            filter: { course: this.props.params.courseId }
          },
          headers: {
            'x-token': localStorage.getItem("token")
          }
        }).then(res => {
          const newPackageOfCourse = this.state.packageOfCourse;

          newPackageOfCourse.data = res.results.objects.rows;

          newPackageOfCourse.isFetching = false;
          newPackageOfCourse.isEmpty = false;

          this.setState({ packageOfCourse: newPackageOfCourse });

        }).catch(err => {
          const newPackageOfCourse = this.state.packageOfCourse;

          newPackageOfCourse.isFetching = false;
          newPackageOfCourse.isEmpty = true;

          this.setState({ packageOfCourse: newPackageOfCourse });
        })
    }

  };

  deactiveClass = async (classId) => {
    const body = {
      status: "deactive"
    }
    const newTimeTableOfCourse = this.state.timeTableOfCourse;
    newTimeTableOfCourse.isFetching = true;

    this.setState({ timeTableOfCourse: newTimeTableOfCourse })
    Swal.showLoading();
    api.class
      .changeStatus(classId, "deactive", {
        headers: {
          'x-token': localStorage.getItem("token")
        }
      })
      .then(res => {
        Swal.fire('Thành công', 'Thay đổi trạng thái lớp học thành công', 'success');
        this.props.dispatch({
          type: `UPDATE_CLASS_SUCCESS`,
          payload: res.result.object
        });
        const newTimeTableOfCourse = this.state.timeTableOfCourse;

        const indexNeedUpdate = newTimeTableOfCourse.data.findIndex(item => {
          return classId === item.class._id;
        });

        newTimeTableOfCourse.data.splice(indexNeedUpdate, 1);
        newTimeTableOfCourse.isFetching = false;

        this.setState({ timeTableOfCourse: newTimeTableOfCourse })
      })
      .catch(err => {
        Swal.fire('Thất bại', 'Thay đổi trạng thái lớp học thất bại', 'error');
        this.props.dispatch({
          type: `UPDATE_CLASS_ERROR`,
          payload: err.message
        });
      });
    // api.class.update(classId, body, {}).then(res => {
    //   const newTimeTableOfCourse = this.state.timeTableOfCourse;

    //   const indexNeedUpdate = newTimeTableOfCourse.data.findIndex(item => {
    //     return classId === item.class._id;
    //   });

    //   newTimeTableOfCourse.data.splice(indexNeedUpdate, 1);
    //   newTimeTableOfCourse.isFetching = false;

    //   this.setState({ timeTableOfCourse: newTimeTableOfCourse })
    // })
  }

  handleScroll = () => { };

  componentWillUnmount() { }

  componentDidMount() {
    this.fetchData(
    );

    var heightOfHeader = $(
      '.course-details .course-details__header .headerAdmin__wrapper'
    ).height();
    $('.course-details .course-details__body').css(
      'margin-top',
      heightOfHeader + 'px'
    );

    $(
      '.course-details__body__card__content__chart__filter__form__input'
    ).datetimepicker({
      format: 'd/m/Y',
      timepicker: false,
      mask: false
    });
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div className="course-details">
        <CreatePackage
          show={this.state.modals.createPackage}
          hideModal={() => {
            this.showHideModal('createPackage');
          }}
          createPackage={this.createPackage}
        />
        <React.Fragment>
          <div className="course-details__body">
            <div className="course-details__body__card">
              <div className="course-details__body__card__title">
                Thông tin khóa học
              </div>
              <div className="course-details__body__card__content">
                <div className="course-details__body__card__content__course">
                  <div className="course-details__body__card__content__course__info">
                    <CourseInfo
                      courseInfo={this.state.course.data}
                      isFetchingCourseInfo={this.state.course.isFetching}
                      isEmptyCourseInfo={this.state.course.isEmpty}
                      deactiveClass={this.deactiveClass}

                      timeTableOfCourse={this.state.timeTableOfCourse.data}
                      isFetchingTimeTable={this.state.timeTableOfCourse.isFetching}
                      isEmptyTimeTable={this.state.timeTableOfCourse.isEmpty}

                      packageOfCourse={this.state.packageOfCourse.data}
                      isFetchingPackage={this.state.packageOfCourse.isFetching}
                      isEmptyPackage={this.state.packageOfCourse.isEmpty}
                      showAddPackage={() => { this.showHideModal("createPackage") }}
                      deletePackageOfCourse={this.deletePackageOfCourse}
                    ></CourseInfo>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}
