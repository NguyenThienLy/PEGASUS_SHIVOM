import * as React from 'react';
import './newClassInfo.scss';
import { ImageUpload } from '../../../../../../components';

export class NewClassInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        quantity: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        code: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        teacher: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        course: {
          value: '',
          isValid: false,
          errorMessage: ''
        }
      },
      validate: {
        rules: {
          name: {
            required: true
          },
          quantity: {
            required: true,
            numberFormat: true
          },
          code: {
            required: true
          },
          teacher: {
            required: true
          },
          course: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Bắt buộc nhập tên lớp học'
          },
          quantity: {
            required: 'Bắt buộc nhập số lượng học viên',
            numberFormat: 'Vui lòng nhập số lượng hợp lệ'
          },
          code: {
            required: 'Bắt buộc nhập mã lớp'
          },
          teacher: {
            required: 'Bắt buộc chọn giáo viên'
          },
          course: {
            required: 'Bắt buộc chọn khóa học'
          }
        }
      }
    };

    this.checkPageValidation = this.checkPageValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  checkPageValidation() {
    for (var key in this.state.form) {
      if (!this.state.form[key].isValid) {
        return false;
      }
    }

    return true;
  }

  handleChange(event) {
    let { name, value } = event.target;
    value = value.trim();

    if (name === 'quantity') value = Number(value);

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
        } else if (
          rule.numberFormat &&
          rule.numberFormat === true &&
          value.length !== 0
        ) {
          let isValid = !isNaN(value);

          if (key === 'quantity') {
            isValid = isValid ? (value < 10 ? false : true) : isValid;
          }

          this.setState({
            form: _.merge(this.state.form, {
              [key]: {
                value: value,
                isValid: isValid,
                errorMessage: isValid
                  ? ''
                  : this.state.validate.messages[key].numberFormat
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

  render() {
    return (
      <div className="new-class-info">
        <div className="new-class-info__title">Thông tin cơ bản</div>
        <hr className="divider" />
        <form className="new-class-info__form">
          <div className="new-class-info__form__info">
            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Tên lớp học <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-class-info__input-box"
                placeholder="Yoga cộng đồng buổi sáng"
                type="text"
                name="name"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="new-class-info__form__info__item__error-message">
                {this.state.form.name.errorMessage}
              </small>
            </div>

            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Sĩ số <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-class-info__input-box"
                placeholder="50"
                type="number"
                min="10"
                name="quantity"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="new-class-info__form__info__item__error-message">
                {this.state.form.quantity.errorMessage}
              </small>
            </div>
            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Mã lớp <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-class-info__input-box"
                placeholder=""
                type="text"
                name="code"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="new-class-info__form__info__item__error-message">
                {this.state.form.code.errorMessage}
              </small>
            </div>

            {/* <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Code <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-class-info__input-box"
                placeholder="Code 1"
                type="text"
                name="slug"
                onChange={this.handleChange}
              />
            </div> */}

            <div className="new-class-info__form__info__icon">
              <i className="fas fa-address-card"></i>
            </div>
          </div>

          <div className="new-class-info__form__info">
            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Khóa học <span>* (bắt buộc)</span>
              </div>
              <div className="new-class-info__select-box">
                <select
                  className="new-class-info__select-box__select"
                  name="course"
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                >
                  <option value="" hidden>
                    Chọn khoá học
                  </option>
                  {this.props.courses.map((course, index) => {
                    return (
                      <option value={course._id} key={index}>
                        {course.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <small className="new-class-info__form__info__item__error-message">
                {this.state.form.course.errorMessage}
              </small>
            </div>

            <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Giáo viên <span>* (bắt buộc)</span>
              </div>
              <div className="new-class-info__select-box">
                <select
                  className="new-class-info__select-box__select"
                  name="teacher"
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                >
                  <option value="" hidden>
                    Chọn giáo viên
                  </option>
                  {this.props.teachers.map((teacher, index) => {
                    return (
                      <option value={teacher._id} key={index}>
                        {teacher.firstName} {teacher.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <small className="new-class-info__form__info__item__error-message">
                {this.state.form.teacher.errorMessage}
              </small>
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
                name="shortDescription"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              ></textarea>
            </div>

            <div className="new-class-info__form__info__icon">
              <i className="fas fa-camera-retro"></i>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
