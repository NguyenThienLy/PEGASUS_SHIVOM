import * as React from "react";
import "./tryItNowForm.scss";
import * as _ from "lodash";

export class TryItNowForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      form: {
        name: {
          value: "",
          isValid: false,
          errorMessage: ""
        },
        address: {
          value: "",
          isValid: false,
          errorMessage: ""
        },
        email: {
          value: "",
          isValid: true,
          errorMessage: ""
        },
        phone: {
          value: "",
          isValid: false,
          errorMessage: ""
        }
      },
      validate: {
        rules: {
          name: {
            required: true
          },
          address: {
            required: true
          },
          email: {
            required: false,
            regexr: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/im
          },
          phone: {
            required: true,
            regexr: /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/im
          }
        },
        messages: {
          name: {
            required: "Bắt buộc nhập họ tên"
          },
          address: {
            required: "Bắt buộc nhập địa chỉ"
          },
          email: {
            regexr: "Đây không phải là email"
          },
          phone: {
            required: "Bắt buộc phải nhập số điện thoại",
            regexr: "Đây không phải là số điện thoại"
          }
        }
      }
    };
    this.checkFormValid = this.checkFormValid.bind(this);
  }
  checkFormValid() {
    for (const key in this.state.form) {
      if (!this.state.form[key].isValid) {
        return false;
      }
    }
    return true;
  }
  submit(e) {
    e.preventDefault();
    if (this.checkFormValid()) {
      const body = {
        fullName: this.refs.name.value,
        address: this.refs.name.value,
        email: this.refs.email.value,
        phone: this.refs.phone.value,
        course: this.refs.course.value
      };
      this.props.addContact(body);
    } else {
      alert("Vui lòng kiểm tra lại thông tin");
    }
  }
  componentDidMount() {
    // setTimeout(() => {
    //     $("#try-it-now-form").validate({
    //         // onfocusout: true,
    //         // onkeyup: true,
    //         // onclick: true,
    //         rules: {
    //             "name": {
    //                 required: true,
    //                 maxlength: 15
    //             },
    //             address: {
    //                 required: true
    //             }
    //         },
    //         // messages: {
    //         //     "name": {
    //         //         required: "Bắt buộc nhập nha cu",
    //         //         maxlength: "Nhập 15 ký tự thôi nhập nhiều thế"
    //         //     }
    //         // }
    //     });
    // }, 0)
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.handleInputValidation(name, value);
  };
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
          rule.regexr &&
          value.length > 0 &&
          !rule.regexr.test(value)
        ) {
          // let isValid = rule.required ? false : true
          // if(value >
          this.setState({
            form: _.merge(this.state.form, {
              [key]: {
                value: value,
                isValid: false,
                errorMessage: this.state.validate.messages[key].regexr
              }
            })
          });
        } else {
          this.setState({
            form: _.merge(this.state.form, {
              [key]: {
                value: value,
                isValid: true,
                errorMessage: ""
              }
            })
          });
        }
        return;
      }
    });
    console.log("this state: ", this.state);
  };
  render() {
    return (
      <React.Fragment>
        <form
          className="try-it-now__form"
          id="try-it-now-form"
          onSubmit={this.submit}
        >
          <input
            type="text"
            placeholder="Họ và tên"
            className="try-it-now__form__input"
            ref="name"
            name="name"
            onChange={this.handleChange}
            onBlur={this.handleChange}
          />
          <small className="try-it-now__form__error-message">
            {this.state.form.name.errorMessage}
          </small>
          <input
            type="text"
            placeholder="Địa chỉ"
            className="try-it-now__form__input"
            name="address"
            ref="address"
            onChange={this.handleChange}
            onBlur={this.handleChange}
          />
          <small className="try-it-now__form__error-message">
            {this.state.form.address.errorMessage}
          </small>
          <input
            type="email"
            placeholder="E-mail"
            className="try-it-now__form__input"
            name="email"
            ref="email"
            onChange={this.handleChange}
            onBlur={this.handleChange}
          />
          <small className="try-it-now__form__error-message">
            {this.state.form.email.errorMessage}
          </small>
          <input
            type="text"
            placeholder="Số điện thoại"
            className="try-it-now__form__input"
            name="phone"
            ref="phone"
            onChange={this.handleChange}
            onBlur={this.handleChange}
          />
          <small className="try-it-now__form__error-message">
            {this.state.form.phone.errorMessage}
          </small>
          <div className="try-it-now__form__select-box">
            <select
              required
              className="try-it-now__form__select-box__select"
              ref="course"
            >
              {this.props.defaultCourse ? (
                <option value={this.props.defaultCourse._id}>
                  {this.props.defaultCourse.name}
                </option>
              ) : this.props.courses.length > 0 ? (
                this.props.courses.map(course => {
                  return (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  );
                })
              ) : (
                <option value="" hidden>
                  Chọn khoá học
                </option>
              )}
            </select>
          </div>
          <button
            type="submit"
            className="try-it-now__form__btn try-it-now__form__btn--primary"
          >
            gửi
          </button>
        </form>
      </React.Fragment>
    );
  }
}
