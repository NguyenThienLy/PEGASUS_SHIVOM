import * as React from "react";
import "./reviewAddMember.scss";

export class ReviewAddMember extends React.Component {
  constructor(props) {
    super(props);
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
                src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-1a-768x768.jpg"
                alt=""
              />
            </div>
            <div className="reviewAddMember__content__left__name">
              <span>Hoàng Thị Ngọc Hạnh</span>
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
                  54354456575
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Điểm tích lũy
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  0
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Họ
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  Nguyễn
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Tên đệm và tên
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  Văn A
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Số điện thoại
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  1234567899
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Sinh nhật
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  28/12/1994
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Địa chỉ
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  128/3G đường số 3 phường 11 quận Gò Vấp
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
              <div className="reviewAddMember__content__right__info__item">
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
              </div>
            </div>

            <div className="reviewAddMember__content__right__title">
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
                  <div className="time-table__list-events__event__class-info__class-name">
                    Cân bằng cơ thể
                  </div>
                  <div className="time-table__list-events__event__class-info__class-time">
                    07:00 - 09:00
                  </div>
                </div>
              </div>
              <div className="reviewAddMember__content__right__timeTable__event">
                <div className="reviewAddMember__content__right__timeTable__event__date">
                  Thứ ba
                </div>
                <div className="reviewAddMember__content__right__timeTable__event__class-info">
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
        </div>
        <hr className="divider" />
        <div className="reviewAddMember__more">
          <div className="reviewAddMember__more__sum">
            <span className="reviewAddMember__more__sum__title">Tổng tiền</span>
            <span className="reviewAddMember__more__sum__content">
              500.000<u>đ</u>
            </span>
          </div>
          <div className="reviewAddMember__more__button">
            <button>Xác nhận</button>
          </div>
        </div>
      </div>
    );
  }
}
