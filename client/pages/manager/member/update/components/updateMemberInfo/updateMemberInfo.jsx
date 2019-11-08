import * as React from 'react';
import './newMemberInfo.scss';
import { ImageUpload } from '../imageUpload/imageUpload';

export class NewMemberInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        cardId: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        firstName: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        lastName: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        phone: {
          value: '',
          isValid: false,
          errorMessage: ''
        },
        birthday: {
          value: '',
          isValid: false,
          errorMessage: ''
        }
      },
      validate: {
        rules: {
          cardId: {
            required: true,
            numberFormat: true
          },
          firstName: {
            required: true
          },
          lastName: {
            required: true
          },
          phone: {
            required: true,
            numberFormat: true
          },
          birthday: {
            required: true
          }
        },
        messages: {
          cardId: {
            required: 'Bắt buộc nhập mã số thẻ',
            numberFormat: 'Vui lòng nhập mã số thẻ hợp lệ'
          },
          firstName: {
            required: 'Bắt buộc nhập tên'
          },
          lastName: {
            required: 'Bắt buộc nhập họ và tên đệm'
          },
          phone: {
            required: 'Bắt buộc nhập số điện thoại',
            numberFormat: 'Vui lòng nhập số điện thoại hợp lệ'
          },
          birthday: {
            required: 'Bắt buộc nhập sinh nhật'
          }
        }
      }
    };
    this.checkPageValidation = this.checkPageValidation.bind(this);
    this.changeAvatarFile = this.changeAvatarFile.bind(this);
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

    if (name === 'point') value = Number(value);

    this.handleInputValidation(name, value);
    this.props.handleChange('personalInfo', name, value);
    this.props.handleIsValid(this.props.pageNumber, this.checkPageValidation());
  }

  changeAvatarFile(file, fileUrl) {
    this.props.handleChange('personalInfo', 'avatar', file);
    this.props.handleChange('personalInfo', 'avatarUrl', fileUrl);
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

          if (key === 'point') {
            isValid = isValid ? (value < 0 ? false : true) : isValid;
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

  componentDidMount() {
    $('.newMemberInfo__input-box--date').datetimepicker({
      format: 'd/m/Y',
      timepicker: false,
      mask: false
    });
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
                type="text"
                name="cardId"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="newMemberInfo__form__info__item__error-message">
                {this.state.form.cardId.errorMessage}
              </small>
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">Điểm tích lũy</div>
              <input
                className="newMemberInfo__input-box"
                defaultValue={0}
                min="0"
                type="number"
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
              <div className="newMemberInfo__title-text">
                Họ và tên đệm <span>* (bắt buộc)</span>
              </div>
              <input
                className="newMemberInfo__input-box"
                placeholder="Nguyễn"
                type="text"
                name="firstName"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="newMemberInfo__form__info__item__error-message">
                {this.state.form.lastName.errorMessage}
              </small>
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">
                Tên <span>* (bắt buộc)</span>
              </div>
              <input
                className="newMemberInfo__input-box"
                placeholder="Văn A"
                type="text"
                name="lastName"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="newMemberInfo__form__info__item__error-message">
                {this.state.form.firstName.errorMessage}
              </small>
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">
                Số điện thoại <span>* (bắt buộc)</span>
              </div>
              <input
                className="newMemberInfo__input-box"
                placeholder="0123456789"
                type="text"
                name="phone"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="newMemberInfo__form__info__item__error-message">
                {this.state.form.phone.errorMessage}
              </small>
            </div>
            <div className="newMemberInfo__form__info__item">
              <div className="newMemberInfo__title-text">
                Sinh nhật <span>* (bắt buộc)</span>
              </div>
              <input
                className="newMemberInfo__input-box newMemberInfo__input-box--date"
                type="text"
                name="birthday"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="newMemberInfo__form__info__item__error-message">
                {this.state.form.birthday.errorMessage}
              </small>
            </div>
            <div className="newMemberInfo__form__info__item newMemberInfo__form__info__item--single">
              <div className="newMemberInfo__title-text">Địa chỉ</div>
              <input
                className="newMemberInfo__input-box"
                placeholder="số nhà/ đường/ phường/ ..."
                type="text"
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
