import * as React from "react";
import "./reviewUpdateMember.scss";

export class ReviewUpdateMember extends React.Component {
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
      <div className="reviewUpdateMember">
        <div className="reviewUpdateMember__title">Xác nhận thông tin</div>
        <hr className="divider" />
        <div className="reviewUpdateMember__content">
          <div className="reviewUpdateMember__content__left">

            <div className="reviewUpdateMember__content__left__avatar">
              <img
                src={this.props.data.personalInfo.avatarUrl}
                alt=""
              />
            </div>

            <div className="reviewUpdateMember__content__left__name">
              <span>{this.props.data.personalInfo.firstName} {this.props.data.personalInfo.lastName}</span>
            </div>
          </div>
          <div className="reviewUpdateMember__content__right">
            <div className="reviewUpdateMember__content__right__title">
              <div className="reviewUpdateMember__content__right__title__inner">
                <div>Thông tin cá nhân</div>
                <div className="reviewUpdateMember__content__right__title__inner--hover" />
              </div>
            </div>

            <div className="reviewUpdateMember__content__right__info">
              <div className="reviewUpdateMember__content__right__info__item">
                <div className="reviewUpdateMember__content__right__info__item__title">
                  Mã số thẻ
                </div>
                <div className="reviewUpdateMember__content__right__info__item__content">
                  {this.props.data.personalInfo.cardId}
                </div>
              </div>
              <div className="reviewUpdateMember__content__right__info__item">
                <div className="reviewUpdateMember__content__right__info__item__title">
                  Điểm tích lũy
                </div>
                <div className="reviewUpdateMember__content__right__info__item__content">
                  {this.props.data.personalInfo.point}
                </div>
              </div>

              <div className="reviewUpdateMember__content__right__info__item">
                <div className="reviewUpdateMember__content__right__info__item__title">
                  Họ
                </div>
                <div className="reviewUpdateMember__content__right__info__item__content">
                  {this.props.data.personalInfo.firstName}
                </div>
              </div>

              <div className="reviewUpdateMember__content__right__info__item">
                <div className="reviewUpdateMember__content__right__info__item__title">
                  Tên đệm và tên
                </div>
                <div className="reviewUpdateMember__content__right__info__item__content">
                  {this.props.data.personalInfo.lastName}
                </div>
              </div>

              <div className="reviewUpdateMember__content__right__info__item">
                <div className="reviewUpdateMember__content__right__info__item__title">
                  Số điện thoại
                </div>
                <div className="reviewUpdateMember__content__right__info__item__content">
                  {this.props.data.personalInfo.phone}
                </div>
              </div>

              <div className="reviewUpdateMember__content__right__info__item">
                <div className="reviewUpdateMember__content__right__info__item__title">
                  Sinh nhật
                </div>
                <div className="reviewUpdateMember__content__right__info__item__content">
                  {this.props.data.personalInfo.birthday}
                </div>
              </div>

              <div className="reviewUpdateMember__content__right__info__item">
                <div className="reviewUpdateMember__content__right__info__item__title">
                  Địa chỉ
                </div>
                <div className="reviewUpdateMember__content__right__info__item__content">
                  {this.props.data.personalInfo.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
