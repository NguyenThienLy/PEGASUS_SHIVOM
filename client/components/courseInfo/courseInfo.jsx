import * as React from "react";
import "./courseInfo.scss";
import { Loading } from "../../components";
import { Tooltip } from 'react-tippy';

export class CourseInfo extends React.Component {
  constructor(props) {
    super(props);

    this.updateCourse = this.updateCourse.bind(this);
    this.addNewClass = this.addNewClass.bind(this);
    this.deactiveClass = this.deactiveClass.bind(this);
    this.addNewCoursePackage = this.addNewCoursePackage.bind(this)
    this.deletePackageOfCourse = this.deletePackageOfCourse.bind(this)
  }

  updateCourse() {
    this.props.updateCourse();
  }

  addNewClass() {
    this.props.addNewClass();
  }

  addNewCoursePackage() {
    this.props.showAddPackage();
  }

  deactiveClass(classId) {
    this.props.deactiveClass(classId);
  }

  deletePackageOfCourse(packageId) {
    this.props.deletePackageOfCourse(packageId);
  }

  render() {
    const { courseInfo, isFetchingCourseInfo, isEmptyCourseInfo,
      timeTableOfCourse, isFetchingTimeTable, isEmptyTimeTable,
      packageOfCourse, isFetchingPackage, isEmptyPackage } = this.props;

    return (

      <div className="courseInfo">
        {isFetchingCourseInfo && <Loading />}
        {isEmptyCourseInfo && !isFetchingCourseInfo && "Dữ liệu trống"}
        {!isFetchingCourseInfo && !isEmptyCourseInfo && (
          <div>
            <div className="courseInfo__name">{courseInfo.name}</div>
            <Tooltip
              title="Chỉnh sửa"
              position="top"
              className="courseInfo__update-button"
            >
              <span
                onClick={() => this.updateCourse()}>
                <i class="fas fa-edit"></i>
              </span>
            </Tooltip>
            <div className="courseInfo__description">{courseInfo.slug}</div>

            <div className="courseInfo__details">
              <div className="courseInfo__details__row">
                <div className="courseInfo__details__row__holder">
                  <div className="courseInfo__details__row__holder__title">
                    Số lượng học viên
                  </div>
                  <div className="courseInfo__details__row__holder__content">
                    {courseInfo.quantity}
                  </div>
                </div>
                <div className="courseInfo__details__row__holder">
                  <div className="courseInfo__details__row__holder__title">
                    Giá học phí theo tháng
                  </div>
                  <div className="courseInfo__details__row__holder__content">
                    {courseInfo.pricePerMonth}
                  </div>
                </div>
              </div>
              <div className="courseInfo__details__row">
                <div className="courseInfo__details__row__holder">
                  <div className="courseInfo__details__row__holder__title">
                    Số lượng học viên đã đăng kí
                  </div>
                  <div className="courseInfo__details__row__holder__content">
                    {courseInfo.currentStudentAmount}
                  </div>
                </div>
                <div className="courseInfo__details__row__holder">
                  <div className="courseInfo__details__row__holder__title">
                    Trạng thái
                  </div>
                  <div className="courseInfo__details__row__holder__content">
                    {courseInfo.status}
                  </div>
                </div>
              </div>
              <div className="courseInfo__details__row">
                <div className="courseInfo__details__row__holder">
                  <div className="courseInfo__details__row__holder__title">
                    Ảnh đại diện
              </div>
                  <div className="courseInfo__details__row__holder__content">
                    <img src={courseInfo.thumb}></img>
                  </div>
                </div>
              </div>
              <div className="courseInfo__details__row">
                <div className="courseInfo__details__row__holder">
                  <div className="courseInfo__details__row__holder__title">
                    Mô tả
                 </div>
                  <div className="courseInfo__details__row__holder__content" dangerouslySetInnerHTML={{
                    __html: courseInfo.description
                  }}>
                  </div>
                </div>
              </div>
              <div className="courseInfo__details__row">
                <div className="courseInfo__details__row__holder">
                  <div className="courseInfo__details__row__holder__title">
                    Lợi ích khóa học
              </div>
                  <div className="courseInfo__details__row__holder__content">
                    {courseInfo.benefits.map((benefit, key) => {
                      return (<div key={key}
                        className="courseInfo__details__row__holder__content">
                        {benefit}
                      </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div >
          Danh sách các gói khuyến mãi của khóa học

          <Tooltip
            title="Thêm gói khuyến mãi mới"
            position="top"
            className="courseInfo__update-button"
          >
            <span onClick={this.addNewCoursePackage}>
              <i class="fas fa-plus"></i>
            </span>
          </Tooltip></div>

        {isFetchingPackage && <Loading />}
        {isEmptyPackage && !isFetchingPackage && "Dữ liệu trống"}
        {!isFetchingPackage && !isEmptyPackage && (

          packageOfCourse.map((packageCourse, index) => {
            return (
              <div key={index}>
                <div className="courseInfo__timeTable">
                  <div className="courseInfo__timeTable__event">
                    <div className="courseInfo__timeTable__event__date">{packageCourse.name}</div>
                  </div>

                  <div className="courseInfo__timeTable__event">
                    <div className="courseInfo__timeTable__event__date">Số tháng:{packageCourse.monthAmount}</div>

                    <div className="courseInfo__timeTable__event__class-info">
                      <a
                        href="#"
                        className="courseInfo__timeTable__event__class-info__class-name"
                      >
                        Giá gốc: {packageCourse.priceBeforeDiscount}
                        Giá khuyến mãi: {packageCourse.price}
                      </a>

                      <div className="courseInfo__timeTable__event__class-info__class-time">
                        <Tooltip
                          title="Xóa gói khuyến mãi khỏi khóa học"
                          position="top"
                          className="courseInfo__update-button"
                        >
                          <span onClick={() => this.deletePackageOfCourse(packageCourse._id)}>
                            <i class="fas fa-ban"></i>
                          </span>
                        </Tooltip>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div >
          Danh sách các lớp học của khóa học
            <Tooltip
            title="Thêm lớp học mới"
            position="top"
            className="courseInfo__update-button"

          >
            <span onClick={this.addNewClass}>
              <i class="fas fa-plus"></i>
            </span>
          </Tooltip></div>

        {isFetchingTimeTable && <Loading />}
        {isEmptyTimeTable && !isFetchingTimeTable && "Dữ liệu trống"}
        {!isFetchingTimeTable && !isEmptyTimeTable && (

          timeTableOfCourse.map((classData, index) => {
            let sorter = {
              monday: {
                value: 1,
                text: "Thứ hai"
              },
              tuesday: {
                value: 2,
                text: "Thứ ba"
              },
              wednesday: {
                value: 3,
                text: "Thứ tư"
              },
              thursday: {
                value: 4,
                text: "Thứ năm"
              },
              friday: {
                value: 5,
                text: "Thứ sáu"
              },
              saturday: {
                value: 6,
                text: "Thứ bảy"
              },
              sunday: {
                value: 7,
                text: "Chủ nhật"
              }
            };
            return (
              <div key={index}>
                <div className="courseInfo__timeTable">
                  <div className="courseInfo__timeTable__event">
                    <div className="courseInfo__timeTable__event__date">{classData.class.name}</div>
                  </div>

                  <div className="courseInfo__timeTable__event">
                    <div className="courseInfo__timeTable__event__date">{classData.class.teacher.firstName} {classData.class.teacher.lastName}</div>

                    <div className="courseInfo__timeTable__event__class-info">
                      <a
                        href="#"
                        className="courseInfo__timeTable__event__class-info__class-name"
                      >

                      </a>
                      <div className="courseInfo__timeTable__event__class-info__class-time">

                        <Tooltip
                          title="Tạm thời xoá lớp học"
                          position="top"
                          className="courseInfo__update-button"

                        >
                          <span onClick={() => this.deactiveClass(classData.class._id)}>
                            <i class="fas fa-ban"></i>
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  {classData.items
                    .sort(function (a, b) {
                      return (
                        sorter[a.dayOfWeek].value -
                        sorter[b.dayOfWeek].value
                      );
                    })
                    .map((timeTableItem, index) => {
                      return (
                        <div
                          key={index}
                          className="course__body__wrapper__main-content__classes__class__class-time__time-item"
                        >
                          <div className="courseInfo__timeTable__event">
                            <div className="courseInfo__timeTable__event__date"> {sorter[timeTableItem.dayOfWeek].text}</div>

                            <div className="courseInfo__timeTable__event__class-info">
                              <a
                                href="#"
                                className="courseInfo__timeTable__event__class-info__class-name"
                              >
                                {timeTableItem.topic}
                              </a>
                              <div className="courseInfo__timeTable__event__class-info__class-time">
                                {timeTableItem.startTime.hour}:{timeTableItem.startTime.minute === 0 ? '00' : timeTableItem.startTime.minute}
                                -
                                {timeTableItem.endTime.hour}:{timeTableItem.endTime.minute === 0 ? '00' : timeTableItem.endTime.minute}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
        )}

      </div>
    );
  }
}
