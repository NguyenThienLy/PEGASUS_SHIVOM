import * as React from "react";
import "./newClassInfo.scss";
import { ImageUpload } from "../imageUpload/imageUpload";

export class NewClassInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.changeImageFile = this.changeImageFile.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.props.handleChange(name, value);
  }
  changeImageFile(file, fileUrl) {
    this.props.handleChange("thumb", file);
    this.props.handleChange("thumbUrl", fileUrl);
  }
  render() {
    return (
      <div className="new-class-info">
        <div className="new-class-info__title">Thông tin cơ bản</div>
        <hr className="divider" />
        <form className="new-class-info__form">
          <div className="new-class-info__form__info">
            <div className="new-class-info__form__info__item new-class-info__form__info__item--double">
              <div className="new-class-info__title-text">
                Tên lớp học <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-class-info__input-box"
                placeholder="Yoga cộng đồng buổi sáng"
                type="text"
                name="name"
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Sĩ số <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-class-info__input-box"
                placeholder="50"
                type="number"
                name="slug"
                onChange={this.handleChange}
              />
            </div>

            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Mã code <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-class-info__input-box"
                placeholder="Code 1"
                type="text"
                name="slug"
                onChange={this.handleChange}
              />
            </div>

            <div className="new-class-info__form__info__icon">
              <i className="fas fa-address-card"></i>
            </div>
          </div>

          <div className="new-class-info__form__info new-class-info__form__info--two-columns">
            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Khóa học <span>* (bắt buộc)</span>
              </div>
              <div className="new-class-info__select-box">
                <select required className="new-class-info__select-box__select">
                  <option value="" hidden>
                    Chọn khoá học
                  </option>
                </select>
              </div>
            </div>

            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Giáo viên <span>* (bắt buộc)</span>
              </div>
              <div className="new-class-info__select-box">
                <select required className="new-class-info__select-box__select">
                  <option value="" hidden>
                    Chọn giáo viên
                  </option>
                </select>
              </div>
            </div>

            <div className="new-class-info__form__info__icon">
              <i className="fas fa-user-alt"></i>
            </div>
          </div>

          <div className="new-class-info__form__info">
            <div className="new-class-info__title-text">Giới thiệu ngắn</div>
            <div className="new-class-info__text-area">
              <textarea
                rows="10"
                maxLength="100"
                placeholder="Lớp học giúp bạn dẻo dai hơn"
              ></textarea>
            </div>

            <div className="new-class-info__form__info__icon">
              <i className="fas fa-camera-retro"></i>
            </div>
          </div>
          {/* <div className="new-class-info__form__button">
            <button>
              Tiếp tục <i className="fas fa-chevron-right"></i>
            </button>
          </div> */}
        </form>
      </div>
    );
  }
}
