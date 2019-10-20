import * as React from "react";
import "./memberInfo.scss";
import { Loading } from '../../components';
import { Tooltip } from 'react-tippy';

export class MemberInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { memberInfo, isFetchingMemberInfo, isEmptyMemberInfo,
      courseOfStudent, isFetchingCourseOfStudent, isEmptyCourseOfStudent } = this.props;

    return (
      <div className="memberInfo">
        {isFetchingMemberInfo && <Loading />}
        {isEmptyMemberInfo && !isFetchingMemberInfo && "Dữ liệu trống"}
        {!isFetchingMemberInfo && !isEmptyMemberInfo && (
          <div>
            <div className="memberInfo__left">
              <div className="memberInfo__left__avatar">
                <img
                  src={memberInfo.avatar}
                  alt=""
                />
              </div>
              <div className="memberInfo__left__name">
                <span>{memberInfo.firstName}&nbsp;{memberInfo.lastName}</span>
              </div>
            </div>
            <div className="memberInfo__right">
              <div className="memberInfo__right__title">
                <div className="memberInfo__right__title__inner">
                  <div>Thông tin chi tiết</div>
                  <div className="memberInfo__right__title__inner--hover" />
                </div>
              </div>
              <div className="memberInfo__right__info">
                <div className="memberInfo__right__info__item">
                  <div className="memberInfo__right__info__item__title">
                    Mã số thẻ
              </div>
                  <div className="memberInfo__right__info__item__content">
                    {memberInfo.cardId}
                  </div>
                </div>
                <div className="memberInfo__right__info__item">
                  <div className="memberInfo__right__info__item__title">
                    Điểm tích lũy
              </div>
                  <div className="memberInfo__right__info__item__content"> {memberInfo.point}</div>
                </div>

                <div className="memberInfo__right__info__item">
                  <div className="memberInfo__right__info__item__title">Họ và tên đệm</div>
                  <div className="memberInfo__right__info__item__content">
                    {memberInfo.firstName}
                  </div>
                </div>
                <div className="memberInfo__right__info__item">
                  <div className="memberInfo__right__info__item__title">
                    Tên
              </div>
                  <div className="memberInfo__right__info__item__content">
                    {memberInfo.lastName}
                  </div>
                </div>

                <div className="memberInfo__right__info__item">
                  <div className="memberInfo__right__info__item__title">
                    Số điện thoại
              </div>
                  <div className="memberInfo__right__info__item__content">
                    {memberInfo.phone}
                  </div>
                </div>
                <div className="memberInfo__right__info__item">
                  <div className="memberInfo__right__info__item__title">
                    Sinh nhật
              </div>
                  <div className="memberInfo__right__info__item__content">
                    {memberInfo.birthDay}
                  </div>
                </div>

                <div className="memberInfo__right__info__item">
                  <div className="memberInfo__right__info__item__title">
                    Địa chỉ
              </div>
                  <div className="memberInfo__right__info__item__content">
                    {memberInfo.address}
                  </div>
                </div>
              </div>
              <div className="memberInfo__right__title">
                <Tooltip
                  title="Thêm khóa học mới"
                  position="top"
                  className="courseInfo__update-button"
                >
                  <span>
                    <i class="fas fa-plus"></i>
                  </span>
                </Tooltip>
                <div className="memberInfo__right__title__inner">
                  <div>Đăng ký khóa học</div>
                  <div className="memberInfo__right__title__inner--hover" />
                </div>
              </div>

              <div className="memberInfo__right__info">
                {isFetchingCourseOfStudent && <Loading />}
                {isEmptyCourseOfStudent && !isFetchingCourseOfStudent && "Dữ liệu trống"}
                {!isFetchingCourseOfStudent && !isEmptyCourseOfStudent && (
                  courseOfStudent.map((course, index) => {
                    return (
                      <div key={index} className="memberInfo__right__info__item">
                        <div className="memberInfo__right__info__item__content">
                          {course.course.name}
                        </div>
                        <Tooltip
                          title="Gia hạn"
                          position="top"
                          className="courseInfo__update-button"
                        >
                          <span>
                            <i class="fas fa-hourglass-half"></i>
                          </span>
                        </Tooltip>

                        <Tooltip
                          title="Nghỉ học"
                          position="top"
                          className="courseInfo__update-button"
                        >
                          <span>
                            <i class="fas fa-user-minus"></i>
                          </span>
                        </Tooltip>
                      </div>
                    );
                  }))}
              </div>

              <div className="memberInfo__right__title">
                <div className="memberInfo__right__title__inner">
                  <div>Lịch học</div>
                  <div className="memberInfo__right__title__inner--hover" />
                </div>
              </div>
              <div className="memberInfo__right__timeTable">
                <div className="memberInfo__right__timeTable__event">
                  <div className="memberInfo__right__timeTable__event__date">
                    Thứ hai
              </div>
                  <div className="memberInfo__right__timeTable__event__class-info">
                    <div className="time-table__list-events__event__class-info__class-name">
                      Cân bằng cơ thể
                </div>
                    <div className="time-table__list-events__event__class-info__class-time">
                      07:00 - 09:00
                </div>
                  </div>
                </div>
                <div className="memberInfo__right__timeTable__event">
                  <div className="memberInfo__right__timeTable__event__date">
                    Thứ ba
              </div>
                  <div className="memberInfo__right__timeTable__event__class-info">
                    <div className="time-table__list-events__event__class-info__class-name">
                      Duỗi người
                </div>
                    <div className="time-table__list-events__event__class-info__class-time">
                      07:00 - 09:00
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    );
  }
}
