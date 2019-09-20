import * as React from "react";
import "./reviewAddMember.scss";

export class ReviewAddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null
    }
  }
  getTotalPrice() {

    const totalPrice = this.props.data.courses.length > 0 ? this.props.data.courses.map(course => { return course.price }).reduce((a, b) => { return a + b }) : 0

    return (<React.Fragment>{totalPrice}<u>đ</u></React.Fragment>)
  }

  render() {

    return (
      <div className="reviewAddMember">
        <div className="reviewAddMember__title">Xác nhận thông tin</div>
        <hr className="divider" />
        <div className="reviewAddMember__content">
          <div className="reviewAddMember__content__left">
            <div className="reviewAddMember__content__left__avatar">
              <img
                src={this.props.data.personalInfo.avatarUrl}
                alt=""
              />
            </div>
            <div className="reviewAddMember__content__left__name">
              <span>{this.props.data.personalInfo.firstName} {this.props.data.personalInfo.lastName}</span>
            </div>
          </div>
          <div className="reviewAddMember__content__right">
            <div className="reviewAddMember__content__right__title">
              <div className="reviewAddMember__content__right__title__inner">
                <div>Thông tin cá nhân</div>
                <div className="reviewAddMember__content__right__title__inner--hover" />
              </div>
            </div>
            <div className="reviewAddMember__content__right__info">
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Mã số thẻ
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  {this.props.data.personalInfo.cardId}
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Điểm tích lũy
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  {this.props.data.personalInfo.point}
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Họ
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  {this.props.data.personalInfo.firstName}
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Tên đệm và tên
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  {this.props.data.personalInfo.lastName}
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Số điện thoại
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  {this.props.data.personalInfo.phone}
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Sinh nhật
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  {this.props.data.personalInfo.birthday}
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Địa chỉ
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  {this.props.data.personalInfo.address}
                </div>
              </div>
            </div>

            <div className="reviewAddMember__content__right__title">
              <div className="reviewAddMember__content__right__title__inner">
                <div>Đăng ký khóa học</div>
                <div className="reviewAddMember__content__right__title__inner--hover" />
              </div>
            </div>
            <div className="reviewAddMember__content__right__info">
              {this.props.data.courses.map((course, index) => {
                const courseData = this.props.courses.find((courseData) => { return courseData._id === course._id })
                return (<div className="reviewAddMember__content__right__info__item">
                  <div className="reviewAddMember__content__right__info__item__content">
                    {courseData.name}
                  </div>
                </div>)
              })}
              {/* <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__content">
                  Yoga cộng đồng
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__content">
                  Yoga trị liệu
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__content">
                  Yoga bà bầu
                </div>
              </div> */}
            </div>

            {/* <div className="reviewAddMember__content__right__title">
              <div className="reviewAddMember__content__right__title__inner">
                <div>Lịch học</div>
                <div className="reviewAddMember__content__right__title__inner--hover" />
              </div>
            </div>
            <div className="reviewAddMember__content__right__timeTable">
              <div className="reviewAddMember__content__right__timeTable__event">
                <div className="reviewAddMember__content__right__timeTable__event__date">
                  Thứ hai
                </div>
                <div className="reviewAddMember__content__right__timeTable__event__class-info">
                  <div className="reviewAddMember__content__right__timeTable__event__class-info__class-name">
                    Cân bằng cơ thể
                  </div>
                  <div className="reviewAddMember__content__right__timeTable__event__class-info__class-time">
                    07:00 - 09:00
                  </div>
                </div>
              </div>
              <div className="reviewAddMember__content__right__timeTable__event">
                <div className="reviewAddMember__content__right__timeTable__event__date">
                  Thứ ba
                </div>
                <div className="reviewAddMember__content__right__timeTable__event__class-info">
                  <div className="reviewAddMember__content__right__timeTable__event__class-info__class-name">
                    Duỗi người
                  </div>
                  <div className="reviewAddMember__content__right__timeTable__event__class-info__class-time">
                    07:00 - 09:00
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <hr className="divider" />
        <div className="reviewAddMember__more">
          <div className="reviewAddMember__more__sum">
            <span className="reviewAddMember__more__sum__title">Tổng tiền</span>
            <span className="reviewAddMember__more__sum__content">
              {this.getTotalPrice()}
            </span>
          </div>
          {/* <div className="reviewAddMember__more__button">
            <button>Xác nhận</button>
          </div> */}
        </div>
      </div>
    );
  }
}
