import * as React from "react";
import "./memberInfo.scss";

export class MemberInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { memberInfo } = this.props;

    return (
      <div className="memberInfo">
        <div className="memberInfo__left">
          <div className="memberInfo__left__avatar">
            <img
              src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-1a-768x768.jpg"
              alt=""
            />
          </div>
          <div className="memberInfo__left__name">
            <span>Hoàng Thị Ngọc Hạnh</span>
          </div>
        </div>
        <div className="memberInfo__right">
          <div className="memberInfo__right__title">
            <div className="memberInfo__right__title__inner">
              <div>Thông tin chi tiết</div>
              <div className="memberInfo__right__title__inner--hover" />
            </div>
          </div>
          <div className="memberInfo__right__content">
            <div className="memberInfo__right__content__row">
              <div className="memberInfo__right__content__row__holder">
                <div className="memberInfo__right__content__row__holder__title">
                  Số lớp đã đăng ký
                </div>
                <div className="memberInfo__right__content__row__holder__content">
                  25
                </div>
              </div>
              <div className="memberInfo__right__content__row__holder">
                <div className="memberInfo__right__content__row__holder__title">
                  Thông tin khác
                </div>
                <div className="memberInfo__right__content__row__holder__content">
                  ...
                </div>
              </div>
            </div>

            <div className="memberInfo__right__content__row">
              <div className="memberInfo__right__content__row__holder">
                <div className="memberInfo__right__content__row__holder__title">
                  Khác
                </div>
                <div className="memberInfo__right__content__row__holder__content">
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
