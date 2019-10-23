import * as React from 'react';
import './updateCourseInfo.scss';

import { ImageUpload } from '../../../../../../components';

export class UpdateCourseInfo extends React.Component {
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
        },
        quantity: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
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
          },
          quantity: {
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
          },
          quantity: {
            required: 'Bắt buộc nhập số lượng học viên'
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
      <div className="updateCourseInfo">
        <div className="updateCourseInfo__title">Thông tin cơ bản</div>
        <hr className="divider" />
        <form className="updateCourseInfo__form">
          <div className="updateCourseInfo__form__info">
            <div className="updateCourseInfo__form__info__item">
              <div className="updateCourseInfo__title-text">
                Tên khóa học <span>* (bắt buộc)</span>
              </div>
              <input
                className="updateCourseInfo__input-box"
                placeholder="Yoga cộng đồng"
                type="text"
                name="name"
                value={this.props.data.name}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="updateCourseInfo__form__info__item__error-message">
                {this.state.form.name.errorMessage}
              </small>
            </div>

            <div className="updateCourseInfo__form__info__item">
              <div className="updateCourseInfo__title-text">
                Tên đường dẫn <span>* (bắt buộc)</span>
              </div>
              <input
                className="updateCourseInfo__input-box"
                placeholder="yoga-cong-dong"
                type="text"
                name="slug"
                value={this.props.data.slug}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="updateCourseInfo__form__info__item__error-message">
                {this.state.form.slug.errorMessage}
              </small>
            </div>
            <div className="updateCourseInfo__form__info__item">
              <div className="updateCourseInfo__title-text">
                Số lượng học viên tối đa <span>* (bắt buộc)</span>
              </div>
              <input
                className="updateCourseInfo__input-box"
                placeholder={0}
                type="number"
                name="quantity"
                value={this.props.data.quantity}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="updateCourseInfo__form__info__item__error-message">
                {this.state.form.quantity.errorMessage}
              </small>
            </div>

            <div className="updateCourseInfo__form__info__item updateCourseInfo__form__info__item--single">
              <div className="updateCourseInfo__title-text">
                Giới thiệu ngắn <span>* (bắt buộc)</span>
              </div>
              <div className="updateCourseInfo__text-area">
                <textarea
                  rows="6"
                  maxLength="100"
                  placeholder="Khóa học giúp bạn dẻo dai hơn"
                  name="shortDescription"
                  value={this.props.data.shortDescription}
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                ></textarea>
                <small className="updateCourseInfo__form__info__item__error-message">
                  {this.state.form.shortDescription.errorMessage}
                </small>
              </div>
            </div>

            <div className="updateCourseInfo__form__info__icon">
              <i className="fas fa-address-card"></i>
            </div>
          </div>

          <div className="updateCourseInfo__form__info">
            <div className="updateCourseInfo__form__info__item updateCourseInfo__form__info__item--single">
              <div className="updateCourseInfo__title-text">Các lợi ích</div>
              {this.props.courseBenefits.map((benefit, index) => {
                return (
                  <div className="updateCourseInfo__form__info__item__input-remove">
                    <input
                      className="updateCourseInfo__input-box"
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
              <div className="updateCourseInfo__form__info__item__add-btn">
                <button
                  type="button"
                  onClick={this.props.showUpdateCourseBenefitsModal}
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <div className="updateCourseInfo__form__info__icon">
              <i className="fas fa-user-alt"></i>
            </div>
          </div>

          <div className="updateCourseInfo__form__info">
            <div className="updateCourseInfo__title-text">
              Thêm ảnh đại diện <span>* (bắt buộc)</span>
            </div>

            <div className="updateCourseInfo__form__info__add-photo">
              <ImageUpload changeImage={this.changeImageFile}></ImageUpload>
            </div>

            <div className="updateCourseInfo__form__info__icon">
              <i className="fas fa-camera-retro"></i>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
