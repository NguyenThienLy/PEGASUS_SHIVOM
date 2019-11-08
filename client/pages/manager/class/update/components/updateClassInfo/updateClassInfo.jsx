import * as React from 'react';
import './updateClassInfo.scss';
import { ImageUpload } from '../../../../../../components';

export class UpdateClassInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: {
          value: '',
          isValid: true,
          errorMessage: ''
        },
        // quantity: {
        //   value: '',
        //   isValid: false,
        //   errorMessage: ''
        // },
        code: {
          value: '',
          isValid: true,
          errorMessage: ''
        },
        teacher: {
          value: '',
          isValid: true,
          errorMessage: ''
        },
        course: {
          value: '',
          isValid: true,
          errorMessage: ''
        }
      },
      validate: {
        rules: {
          name: {
            required: true
          },
          // quantity: {
          //   required: true,
          //   numberFormat: true
          // },
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
          // quantity: {
          //   required: 'Bắt buộc nhập số lượng học viên',
          //   numberFormat: 'Vui lòng nhập số lượng hợp lệ'
          // },
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


  render() {
    return (
      <div className="update-class-info">
        <div className="update-class-info__title">Cập nhật lớp học</div>
        <hr className="divider" />
        <form className="update-class-info__form">
          <div className="update-class-info__form__info">
            <div className="update-class-info__form__info__item">
              <div className="update-class-info__title-text">
                Tên lớp học <span>* (bắt buộc)</span>
              </div>
              <input
                className="update-class-info__input-box"
                placeholder="Yoga cộng đồng buổi sáng"
                type="text"
                name="name"
                value={this.props.data.name}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="update-class-info__form__info__item__error-message">
                {this.state.form.name.errorMessage}
              </small>
            </div>
            {/* 
            <div className="update-class-info__form__info__item">
              <div className="update-class-info__title-text">
                Sĩ số <span>* (bắt buộc)</span>
              </div>
              <input
                className="update-class-info__input-box"
                placeholder="50"
                type="number"
                min="10"
                name="quantity"
                value={this.props.data.quantity}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="update-class-info__form__info__item__error-message">
                {this.state.form.quantity.errorMessage}
              </small>
            </div>
             */}
            <div className="update-class-info__form__info__item">
              <div className="update-class-info__title-text">
                Mã lớp <span>* (bắt buộc)</span>
              </div>
              <input
                className="update-class-info__input-box"
                placeholder=""
                type="text"
                name="code"
                value={this.props.data.code}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="update-class-info__form__info__item__error-message">
                {this.state.form.code.errorMessage}
              </small>
            </div>

            {/* <div className="update-class-info__form__info__item">
              <div className="update-class-info__title-text">
                Code <span>* (bắt buộc)</span>
              </div>
              <input
                className="update-class-info__input-box"
                placeholder="Code 1"
                type="text"
                name="slug"
                onChange={this.handleChange}
              />
            </div> */}

            <div className="update-class-info__form__info__icon">
              <i className="fas fa-address-card"></i>
            </div>
          </div>

          <div className="update-class-info__form__info">
            <div className="update-class-info__form__info__item">
              <div className="update-class-info__title-text">
                Khóa học <span>* (bắt buộc)</span>
              </div>
              <div className="update-class-info__select-box">
                <select
                  className="update-class-info__select-box__select"
                  name="course"
                  value={this.props.data.course}
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
              <small className="update-class-info__form__info__item__error-message">
                {this.state.form.course.errorMessage}
              </small>
            </div>

            <div className="update-class-info__form__info__item">
              <div className="update-class-info__title-text">
                Giáo viên <span>* (bắt buộc)</span>
              </div>
              <div className="update-class-info__select-box">
                <select
                  className="update-class-info__select-box__select"
                  name="teacher"
                  value={this.props.data.teacher}
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
              <small className="update-class-info__form__info__item__error-message">
                {this.state.form.teacher.errorMessage}
              </small>
            </div>

            <div className="update-class-info__form__info__icon">
              <i className="fas fa-user-alt"></i>
            </div>
          </div>

          <div className="update-class-info__form__info">
            <div className="update-class-info__title-text">Giới thiệu ngắn</div>
            <div className="update-class-info__text-area">
              <textarea
                rows="10"
                maxLength="100"
                placeholder="Lớp học giúp bạn dẻo dai hơn"
                name="shortDescription"
                value={this.props.data.shortDescription}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              ></textarea>
            </div>

            <div className="update-class-info__form__info__icon">
              <i className="fas fa-camera-retro"></i>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
