import * as React from "react";
import "./newMemberInfo.scss";
import { MyDropzone } from "../myDropzone/myDropzone";

export class NewMemberInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="newMemberInfo">
        <div className="newMemberInfo__title">Thông tin cơ bản</div>
        <hr className="divider" />
        <form className="newMemberInfo__form">
          <div className="newMemberInfo__form__info">
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">
                Mã số thẻ <span>* (bắt buộc)</span>
              </div>
              <input
                className="newMemberInfo__input-box"
                placeholder="0123456789"
                type="number"
                required
              />
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">Điểm tích lũy</div>
              <input
                className="newMemberInfo__input-box"
                placeholder="0"
                type="number"
              />
            </div>
            <div className="newMemberInfo__form__info__icon">
              <i className="fas fa-address-card"></i>
            </div>
          </div>
          <div className="newMemberInfo__form__info">
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">Họ</div>
              <input
                className="newMemberInfo__input-box"
                placeholder="Nguyễn"
                type="text"
              />
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">Tên đệm và tên</div>
              <input
                className="newMemberInfo__input-box"
                placeholder="Văn A"
                type="text"
              />
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">
                Số điện thoại <span>* (bắt buộc)</span>
              </div>
              <input
                className="newMemberInfo__input-box"
                placeholder="0123456789"
                type="number"
                required
              />
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">Sinh nhật</div>
              <input className="newMemberInfo__input-box" type="date" />
            </div>
            <div className="newMemberInfo__form__info__item newMemberInfo__form__info__item--single">
              <div className="newMemberInfo__title-text">Địa chỉ</div>
              <input
                className="newMemberInfo__input-box"
                placeholder="số nhà/ đường/ phường/ ..."
                type="text"
              />
            </div>
            <div className="newMemberInfo__form__info__icon">
              <i className="fas fa-user-alt"></i>
            </div>
          </div>
          <div className="newMemberInfo__form__info">
            <div className="newMemberInfo__title-text">Thêm ảnh đại diện</div>
            <div className="newMemberInfo__form__info__add-photo">
              <MyDropzone></MyDropzone>
            </div>

            <div className="newMemberInfo__form__info__icon">
              <i className="fas fa-camera-retro"></i>
            </div>
          </div>
          {/* <div className="newMemberInfo__form__button">
            <button>
              Tiếp tục <i className="fas fa-chevron-right"></i>
            </button>
          </div> */}
        </form>
      </div>
    );
  }
}
