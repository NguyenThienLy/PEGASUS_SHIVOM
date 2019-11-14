import * as React from 'react';
import './memberInfo.scss';
import * as moment from 'moment';
import { Loading } from '../../components';
import { Tooltip } from 'react-tippy';

export class MemberInfo extends React.Component {
  constructor(props) {
    super(props);

    this.updateMember = this.updateMember.bind(this);
  }

  updateMember() {
    this.props.updateMember();
  }

  render() {
    const {
      memberInfo,
      isFetchingMemberInfo,
      isEmptyMemberInfo,
      courseOfStudent,
      isFetchingCourseOfStudent,
      isEmptyCourseOfStudent,
      timeTableOfStudent,
      isFetchingTimeTable,
      isEmptyTimeTable
    } = this.props;

    return (
      <div className="member-info">
        {isFetchingMemberInfo && <Loading />}
        {!isFetchingMemberInfo && isEmptyMemberInfo && 'Dữ liệu trống'}
        {!isFetchingMemberInfo && !isEmptyMemberInfo && (
          <div>
            <div className="member-info__title">
              {memberInfo.firstName}&nbsp;{memberInfo.lastName}
            </div>

            <div className="member-info__sub-title">
              <div className="member-info__sub-title__name">
                Thông tin chi tiết
            </div>

              <Tooltip
                title="Chỉnh sửa"
                position="top"
                className="member-info__button"
              >
                <span onClick={() => this.updateMember()}>
                  <i class="fas fa-pen"></i>
                </span>
              </Tooltip>
            </div>

            <div className="member-info__details">
              <div className="member-info__details__left">
                <div className="member-info__details__left__avatar">
                  <img src={memberInfo.avatar} alt="" />
                </div>

                <div className="member-info__details__left__name">
                  <span>Ảnh đại diện</span>
                </div>
              </div>

              <div className="member-info__details__right">
                <div className="member-info__details__right__info">
                  <div className="member-info__details__right__info__title">
                    Mã số thẻ
                  </div>

                  <div className="member-info__details__right__info__content">
                    {memberInfo.cardId}
                  </div>
                </div>

                <div className="member-info__details__right__info">
                  <div className="member-info__details__right__info__title">
                    Điểm tích lũy
                  </div>

                  <div className="member-info__details__right__info__content">
                    {memberInfo.point}
                  </div>
                </div>

                <div className="member-info__details__right__info">
                  <div className="member-info__details__right__info__title">
                    Họ và tên đệm
                  </div>

                  <div className="member-info__details__right__info__content">
                    {memberInfo.firstName}
                  </div>
                </div>

                <div className="member-info__details__right__info">
                  <div className="member-info__details__right__info__title">
                    Tên
                  </div>

                  <div className="member-info__details__right__info__content">
                    {memberInfo.lastName}
                  </div>
                </div>

                <div className="member-info__details__right__info">
                  <div className="member-info__details__right__info__title">
                    Số điện thoại
                  </div>

                  <div className="member-info__details__right__info__content">
                    {memberInfo.phone}
                  </div>
                </div>

                <div className="member-info__details__right__info">
                  <div className="member-info__details__right__info__title">
                    Sinh nhật
                  </div>

                  <div className="member-info__details__right__info__content">
                    {moment(memberInfo.birthday).format('DD/MM/YYYY')}
                  </div>
                </div>

                <div className="member-info__details__right__info">
                  <div className="member-info__details__right__info__title">
                    Địa chỉ
                  </div>

                  <div className="member-info__details__right__info__content">
                    {memberInfo.address}
                  </div>
                </div>
              </div>
            </div>

            <div className="member-info__sub-title">
              <div className="member-info__sub-title__name">
                Các khóa học đã đăng ký
              </div>
              <Tooltip
                title="Đăng ký khóa học mới"
                position="top"
                className="member-info__button"
              >
                <span onClick={this.props.regisNewCourse}>
                  <i class="fas fa-plus"></i>
                </span>
              </Tooltip>
            </div>

            <div className="member-info__courses">
              {isFetchingCourseOfStudent && <Loading />}
              {!isFetchingCourseOfStudent &&
                isEmptyCourseOfStudent &&
                'Dữ liệu trống'}
              {!isFetchingCourseOfStudent &&
                !isEmptyCourseOfStudent &&
                courseOfStudent.map((courseStudent, index) => {
                  //console.log('course student: ', courseStudent);
                  return (
                    <div key={index} className="member-info__courses__course">
                      <div className="member-info__courses__course__title">
                        <div className="member-info__courses__course__title__name">
                          {courseStudent.course.name}
                        </div>
                        {courseStudent.status === 'active' ? (
                          <div>
                            <Tooltip
                              title="Thống kê"
                              position="top"
                              className="member-info__button"
                            >
                              <span
                                onClick={() =>
                                  this.props.openStatistic(courseStudent.course._id)
                                }
                              >
                                <i class="fas fa-chart-bar"></i>
                              </span>
                            </Tooltip>

                            <Tooltip
                              title="Gia hạn"
                              position="top"
                              className="member-info__button"
                            >
                              <span
                                onClick={() => {
                                  return this.props.extendTimeCourse(
                                    courseStudent
                                  );
                                }}
                              >
                                <i class="fas fa-hourglass-half"></i>
                              </span>
                            </Tooltip>

                            <Tooltip
                              title="Nghỉ học"
                              position="top"
                              className="member-info__button"
                            >
                              <span
                                onClick={() => {
                                  return this.props.cancelCourse(
                                    courseStudent._id
                                  );
                                }}
                              >
                                <i class="fas fa-times"></i>
                              </span>
                            </Tooltip>
                          </div>
                        ) : (
                            <Tooltip
                              title="Học lại"
                              position="top"
                              className="member-info__button"
                            >
                              <span
                                onClick={() => {
                                  return this.props.relearnCourse(courseStudent);
                                }}
                              >
                                <i class="fas fa-user-plus"></i>
                              </span>
                            </Tooltip>
                          )}
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="member-info__sub-title">
              <div className="member-info__sub-title__name">Lịch học</div>
            </div>

            <div className="member-info__time-table">
              {isFetchingTimeTable && <Loading />}
              {!isFetchingTimeTable && isEmptyTimeTable && 'Dữ liệu trống'}
              {!isFetchingTimeTable &&
                !isEmptyTimeTable &&
                timeTableOfStudent.map((classData, index) => {
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
                    <div key={index} className="member-info__class">
                      <div className="member-info__class__title">
                        <span></span>
                        <div className="member-info__hover-title">
                          <div>{classData.class.name}</div>
                          <div className="member-info__hover-title--hover" />
                        </div>
                      </div>

                      <div className="member-info__class__trainer">
                        {classData.class.teacher.firstName}&nbsp;
                  {classData.class.teacher.lastName}
                      </div>

                      <div className="member-info__class__time-table">
                        {classData.items
                          .sort(function (a, b) {
                            return (
                              sorter[a.dayOfWeek].value - sorter[b.dayOfWeek].value
                            );
                          })
                          .map((timeTableItem, index) => {
                            return (
                              <div
                                key={index}
                                className="member-info__class__time-table__event"
                              >
                                <div className="member-info__class__time-table__event__weekday">
                                  {sorter[timeTableItem.dayOfWeek].text}
                                </div>

                                <div className="member-info__class__time-table__event__class-info">
                                  <div className="member-info__class__time-table__event__class-info__class-name">
                                    {timeTableItem.topic}
                                  </div>
                                  <div className="member-info__class__time-table__event__class-info__class-time">
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
          </div>
        )}
      </div>
    );
  }
}