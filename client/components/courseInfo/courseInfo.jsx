import * as React from 'react';
import './courseInfo.scss';
import { Loading, CourseListBenefits } from '../../components';
import { Tooltip } from 'react-tippy';

export class CourseInfo extends React.Component {
  constructor(props) {
    super(props);

    this.updateCourse = this.updateCourse.bind(this);
    this.addNewClass = this.addNewClass.bind(this);
    this.deactiveClass = this.deactiveClass.bind(this);
    this.addNewCoursePackage = this.addNewCoursePackage.bind(this);
    this.deletePackageOfCourse = this.deletePackageOfCourse.bind(this);
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
    const {
      courseInfo,
      isFetchingCourseInfo,
      isEmptyCourseInfo,
      timeTableOfCourse,
      isFetchingTimeTable,
      isEmptyTimeTable,
      packageOfCourse,
      isFetchingPackage,
      isEmptyPackage
    } = this.props;
    return (
      <div className="course-info">
        {isFetchingCourseInfo && <Loading />}
        {!isFetchingCourseInfo && isEmptyCourseInfo && 'Dữ liệu trống'}
        {!isFetchingCourseInfo && !isEmptyCourseInfo && (
          <>
            <div className="course-info__title">{courseInfo.name}</div>

            <div className="course-info__sub-title">
              <div className="course-info__sub-title__name">
                Thông tin chi tiết
              </div>
              <Tooltip
                title="Chỉnh sửa"
                position="top"
                className="course-info__button"
              >
                <span onClick={() => this.updateCourse()}>
                  <i class="fas fa-pen"></i>
                </span>
              </Tooltip>
            </div>

            <div className="course-info__details">
              <div className="course-info__details__short-info">
                <div className="course-info__details__short-info__wrapper">
                  <div className="course-info__details__short-info__wrapper__title">
                    Đường dẫn
                  </div>
                  <div className="course-info__details__short-info__wrapper__content">
                    {courseInfo.slug}
                  </div>
                </div>

                <div className="course-info__details__short-info__wrapper">
                  <div className="course-info__details__short-info__wrapper__title">
                    Số lượng học viên
                  </div>
                  <div className="course-info__details__short-info__wrapper__content">
                    {courseInfo.quantity}
                  </div>
                </div>

                <div className="course-info__details__short-info__wrapper">
                  <div className="course-info__details__short-info__wrapper__title">
                    Số lượng học viên đã đăng kí
                  </div>
                  <div className="course-info__details__short-info__wrapper__content">
                    {courseInfo.currentStudentAmount}
                  </div>
                </div>

                <div className="course-info__details__short-info__wrapper">
                  <div className="course-info__details__short-info__wrapper__title">
                    Giá học phí theo tháng
                  </div>
                  <div className="course-info__details__short-info__wrapper__content">
                    {courseInfo.pricePerMonth}
                  </div>
                </div>

                <div className="course-info__details__short-info__wrapper">
                  <div className="course-info__details__short-info__wrapper__title">
                    Trạng thái
                  </div>
                  <div className="course-info__details__short-info__wrapper__content">
                    {courseInfo.status}
                  </div>
                </div>
              </div>

              <div className="course-info__details__description">
                <div className="course-info__details__description__wrapper">
                  <div className="course-info__hover-title">
                    <div>Ảnh đại diện</div>
                    <div className="course-info__hover-title--hover" />
                  </div>

                  <div className="course-info__details__description__wrapper__content">
                    <img alt="" src={courseInfo.thumb}></img>
                  </div>
                </div>

                <div className="course-info__details__description__wrapper">
                  <div className="course-info__hover-title">
                    <div>Mô tả</div>
                    <div className="course-info__hover-title--hover" />
                  </div>

                  <div
                    className="course-info__details__description__wrapper__content"
                    dangerouslySetInnerHTML={{
                      __html: courseInfo.description
                    }}
                  ></div>
                </div>

                <div className="course-info__details__description__wrapper">
                  <div className="course-info__hover-title">
                    <div>Lợi ích khóa học</div>
                    <div className="course-info__hover-title--hover" />
                  </div>

                  <div className="course-info__details__description__wrapper__content">
                    <CourseListBenefits
                      courseListBenefits={courseInfo.benefits}
                    ></CourseListBenefits>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="course-info__sub-title">
          <div className="course-info__sub-title__name">Các gói khuyến mãi</div>
          <Tooltip
            title="Thêm gói khuyến mãi"
            position="top"
            className="course-info__button"
          >
            <span onClick={this.addNewCoursePackage}>
              <i class="fas fa-plus"></i>
            </span>
          </Tooltip>
        </div>

        <div className="course-info__promo-packages">
          {isFetchingPackage && <Loading />}
          {!isFetchingPackage && isEmptyPackage && 'Dữ liệu trống'}
          {!isFetchingPackage &&
            !isEmptyPackage &&
            packageOfCourse.map((packageCourse, index) => {
              return (
                <div
                  key={index}
                  className="course-info__promo-packages__package"
                >
                  <div className="course-info__promo-packages__package__title">
                    <span></span>
                    <div className="course-info__promo-packages__package__title__name">
                      {packageCourse.name}
                    </div>
                    <Tooltip
                      title="Xóa gói khuyến mãi"
                      position="top"
                      className="course-info__button"
                    >
                      <span
                        onClick={() =>
                          this.deletePackageOfCourse(packageCourse._id)
                        }
                      >
                        <i class="fas fa-times"></i>
                      </span>
                    </Tooltip>
                  </div>

                  <div className="course-info__promo-packages__package__info">
                    <div className="course-info__promo-packages__package__info__no-of-month">
                      Kéo dài&nbsp;{packageCourse.monthAmount}&nbsp;tháng
                    </div>
                    <span className="course-info__promo-packages__package__info__original-price">
                      {packageCourse.priceBeforeDiscount}đ
                    </span>
                    <span className="course-info__promo-packages__package__info__promo-price">
                      &emsp;{packageCourse.price}đ
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="course-info__sub-title">
          <div className="course-info__sub-title__name">Các lớp học</div>
          <Tooltip
            title="Thêm lớp học"
            position="top"
            className="course-info__button"
          >
            <span onClick={this.addNewClass}>
              <i class="fas fa-plus"></i>
            </span>
          </Tooltip>
        </div>

        {isFetchingTimeTable && <Loading />}
        {!isFetchingTimeTable && isEmptyTimeTable && 'Dữ liệu trống'}
        {!isFetchingTimeTable &&
          !isEmptyTimeTable &&
          timeTableOfCourse.map((classData, index) => {
            let sorter = {
              monday: {
                value: 1,
                text: 'Thứ hai'
              },
              tuesday: {
                value: 2,
                text: 'Thứ ba'
              },
              wednesday: {
                value: 3,
                text: 'Thứ tư'
              },
              thursday: {
                value: 4,
                text: 'Thứ năm'
              },
              friday: {
                value: 5,
                text: 'Thứ sáu'
              },
              saturday: {
                value: 6,
                text: 'Thứ bảy'
              },
              sunday: {
                value: 7,
                text: 'Chủ nhật'
              }
            };
            return (
              <div key={index} className="course-info__class">
                <div className="course-info__class__title">
                  <span></span>
                  <div className="course-info__hover-title">
                    <div>{classData.class.name}</div>
                    <div className="course-info__hover-title--hover" />
                  </div>
                  <Tooltip
                    title="Tạm thời xoá lớp học"
                    position="top"
                    className="course-info__button"
                  >
                    <span
                      onClick={() => this.deactiveClass(classData.class._id)}
                    >
                      <i class="fas fa-times"></i>
                    </span>
                  </Tooltip>
                </div>

                <div className="course-info__class__trainer">
                  {classData.class.teacher.firstName}&nbsp;
                  {classData.class.teacher.lastName}
                </div>

                <div className="course-info__class__time-table">
                  {classData.items
                    .sort(function(a, b) {
                      return (
                        sorter[a.dayOfWeek].value - sorter[b.dayOfWeek].value
                      );
                    })
                    .map((timeTableItem, index) => {
                      return (
                        <div
                          key={index}
                          className="course-info__class__time-table__event"
                        >
                          <div className="course-info__class__time-table__event__weekday">
                            {sorter[timeTableItem.dayOfWeek].text}
                          </div>

                          <div className="course-info__class__time-table__event__class-info">
                            <div className="course-info__class__time-table__event__class-info__class-name">
                              {timeTableItem.topic}
                            </div>
                            <div className="course-info__class__time-table__event__class-info__class-time">
                              {timeTableItem.startTime.hour}:
                              {timeTableItem.startTime.minute === 0
                                ? '00'
                                : timeTableItem.startTime.minute}
                              &nbsp;-&nbsp;{timeTableItem.endTime.hour}:
                              {timeTableItem.endTime.minute === 0
                                ? '00'
                                : timeTableItem.endTime.minute}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
