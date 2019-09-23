import * as React from "react";
import "./newCourseInfo.scss";
import { ImageUpload } from "../imageUpload/imageUpload";

export class NewCourseInfo extends React.Component {
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
  handleRemove(index) {
    console.log(index);
    this.props.handleRemove(index);
  }
  changeImageFile(file, fileUrl) {
    this.props.handleChange("thumb", file);
    this.props.handleChange("thumbUrl", fileUrl);
  }
  render() {
    return (
      <div className="newCourseInfo">
        <div className="newCourseInfo__title">Thông tin cơ bản</div>
        <hr className="divider" />
        <form className="newCourseInfo__form">
          <div className="newCourseInfo__form__info">
            <div className="newCourseInfo__form__info__item">
              <div className="newCourseInfo__title-text">
                Tên khóa học <span>* (bắt buộc)</span>
              </div>
              <input
                className="newCourseInfo__input-box"
                placeholder="Yoga cộng đồng"
                type="text"
                name="name"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="newCourseInfo__form__info__item">
              <div className="newCourseInfo__title-text">
                Tên đường dẫn <span>* (bắt buộc)</span>
              </div>
              <input
                className="newCourseInfo__input-box"
                placeholder="yoga-cong-dong"
                type="text"
                name="slug"
                onChange={this.handleChange}
              />
            </div>
            <div className="newCourseInfo__form__info__item">
              <div className="newCourseInfo__title-text">
                Mô tả ngắn
              </div>
              <textarea
                className="newCourseInfo__input-box"
                placeholder="Mô tả ngắn"
                type="text"
                name="shortDescription"
                onChange={this.handleChange}
              />
            </div>
            <div className="newCourseInfo__form__info__icon">
              <i className="fas fa-address-card"></i>
            </div>
          </div>
          <div className="newCourseInfo__form__info">
            <div className="newCourseInfo__form__info__item newCourseInfo__form__info__item--single">
              <div className="newCourseInfo__title-text">Các lợi ích</div>
              {this.props.courseBenefits.map((benefit, index) => {
                return (
                  <div className="newCourseInfo__form__info__item__input-remove">
                    <input
                      className="newCourseInfo__input-box"
                      type="text"
                      value={benefit}
                    />
                    <i
                      class="fas fa-times"
                      onClick={() => this.handleRemove(index)}
                    ></i>
                  </div>
                );
              })}
              <div className="newCourseInfo__form__info__item__add-btn">
                <button
                  type="button"
                  onClick={this.props.showAddCourseBenefitsModal}
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="newCourseInfo__form__info__icon">
              <i className="fas fa-user-alt"></i>
            </div>
          </div>
          <div className="newCourseInfo__form__info">
            <div className="newCourseInfo__title-text">Thêm ảnh đại diện</div>
            <div className="newCourseInfo__form__info__add-photo">
              <ImageUpload changeImage={this.changeImageFile}></ImageUpload>
            </div>

            <div className="newCourseInfo__form__info__icon">
              <i className="fas fa-camera-retro"></i>
            </div>
          </div>
          {/* <div className="newCourseInfo__form__button">
            <button>
              Tiếp tục <i className="fas fa-chevron-right"></i>
            </button>
          </div> */}
        </form>
      </div>
    );
  }
}
