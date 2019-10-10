import * as React from 'react';
import './newCourseInfo.scss';

import { ImageUpload } from '../../../../../../components';

export class NewCourseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        slug: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        shortDescription: {
          value: '',
          isValid: false,
          errorMessage: ''
        }
      },
      image: {
        isValid: false
      },
      validate: {
        rules: {
          name: {
            required: true
          },
          slug: {
            required: true
          },
          shortDescription: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Bắt buộc nhập tên khóa học'
          },
          slug: {
            required: 'Bắt buộc nhập đường dẫn'
          },
          shortDescription: {
            required: 'Bắt buộc nhập giới thiệu ngắn'
          }
        }
      }
    };
    this.checkPageValidation = this.checkPageValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeImageFile = this.changeImageFile.bind(this);
  }

  checkPageValidation() {
    for (const key in this.state.form) {
      if (!this.state.form[key].isValid) {
        return false;
      }
    }

    if (!this.state.image.isValid) {
      return false;
    }

    return true;
  }

  changeImageFile(file, fileUrl) {
    this.props.handleChange('thumb', file);
    this.props.handleChange('thumbUrl', fileUrl);
    this.setState({
      image: _.merge(this.state.image, {
        isValid: true
      })
    });
    this.props.handleIsValid(this.props.pageNumber, this.checkPageValidation());
  }

  handleChange(event) {
    let { name, value } = event.target;
    value = value.trim();

    this.handleInputValidation(name, value);
    this.props.handleChange(name, value);
    this.props.handleIsValid(this.props.pageNumber, this.checkPageValidation());
  }

  handleInputValidation = (name, value) => {
    _.forEach(this.state.validate.rules, (rule, key) => {
      if (name === key) {
        if (rule.required && value.length === 0) {
          this.setState({
            form: _.merge(this.state.form, {
              [key]: {
                value: value,
                isValid: false,
                errorMessage: this.state.validate.messages[key].required
              }
            })
          });
        } else {
          this.setState({
            form: _.merge(this.state.form, {
              [key]: {
                value: value,
                isValid: true,
                errorMessage: ''
              }
            })
          });
        }
        return;
      }
    });
  };

  handleRemove(index) {
    this.props.handleRemove(index);
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
                onBlur={this.handleChange}
              />
              <small className="newCourseInfo__form__info__item__error-message">
                {this.state.form.name.errorMessage}
              </small>
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
                onBlur={this.handleChange}
              />
              <small className="newCourseInfo__form__info__item__error-message">
                {this.state.form.slug.errorMessage}
              </small>
            </div>

            <div className="newCourseInfo__form__info__item newCourseInfo__form__info__item--single">
              <div className="newCourseInfo__title-text">
                Giới thiệu ngắn <span>* (bắt buộc)</span>
              </div>
              <div className="newCourseInfo__text-area">
                <textarea
                  rows="6"
                  maxLength="100"
                  placeholder="Khóa học giúp bạn dẻo dai hơn"
                  name="shortDescription"
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                ></textarea>
                <small className="newCourseInfo__form__info__item__error-message">
                  {this.state.form.shortDescription.errorMessage}
                </small>
              </div>
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
            <div className="newCourseInfo__title-text">
              Thêm ảnh đại diện <span>* (bắt buộc)</span>
            </div>

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
