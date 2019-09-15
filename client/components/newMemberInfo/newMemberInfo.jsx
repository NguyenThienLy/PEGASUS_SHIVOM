import * as React from "react";
import "./newMemberInfo.scss";
import { ImageUpload } from "../imageUpload/imageUpload";

export class NewMemberInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeAvatarFile = this.changeAvatarFile.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.props.handleChange("memberInfo", name, value)
  }
  changeAvatarFile(file) {
    this.props.handleChange("avatar", "avatar", file)
  }

  render() {
    return (
      <div className="newMemberInfo">
        <div className="newMemberInfo__title">Thông tin cơ bản</div>
        <hr className="divider" />
        <form className="newMemberInfo__form" onSubmit={this.submit}>
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
                ref="cardNumber"
                name="cardNumber"
                onChange={this.handleChange}
              />
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">Điểm tích lũy</div>
              <input
                className="newMemberInfo__input-box"
                placeholder="0"
                type="number"
                ref="point"
                name="point"
                onChange={this.handleChange}
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
                ref="firstName"
                name="firstName"
                onChange={this.handleChange}
              />
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">Tên đệm và tên</div>
              <input
                className="newMemberInfo__input-box"
                placeholder="Văn A"
                type="text"
                ref="lastName"
                name="lastName"
                onChange={this.handleChange}
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
                ref="phone"
                name="phone"
                onChange={this.handleChange}
              />
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">Sinh nhật</div>
              <input className="newMemberInfo__input-box" type="date" ref="birthday" name="birthday" onChange={this.handleChange} />
            </div>
            <div className="newMemberInfo__form__info__item newMemberInfo__form__info__item--single">
              <div className="newMemberInfo__title-text">Địa chỉ</div>
              <input
                className="newMemberInfo__input-box"
                placeholder="số nhà/ đường/ phường/ ..."
                type="text"
                ref="address"
                name="address"
                onChange={this.handleChange}
              />
            </div>
            <div className="newMemberInfo__form__info__icon">
              <i className="fas fa-user-alt"></i>
            </div>
          </div>
          <div className="newMemberInfo__form__info">
            <div className="newMemberInfo__title-text">Thêm ảnh đại diện</div>
            <div className="newMemberInfo__form__info__add-photo">
              <ImageUpload changeImage={this.changeAvatarFile}></ImageUpload>
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
