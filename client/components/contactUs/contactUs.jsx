import * as React from "react";
import "./contactUs.scss";

export class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.send = this.send.bind(this)
  }
  send() {
    const body = {
      fullName: this.refs.name.value,
      address: this.refs.name.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      course: this.refs.course.value
    }
    this.props.addContact(body)
  }
  render() {
    return (
      <div className="contact-us">
        <div className="contact-us__overlay"></div>
        <form className="contact-us__form">
          <input
            type="text"
            placeholder="Họ và tên"
            className="contact-us__form__input"
            ref="name"
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            className="contact-us__form__input"
            ref="address"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="contact-us__form__input"
            ref="email"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="contact-us__form__input"
            ref="phone"
          />
          <div className="contact-us__form__select-box">
            <select required className="contact-us__form__select-box__select" ref="course">
              {this.props.courses.length > 0 ? this.props.courses.map(course => {
                return (
                  <option value={course._id}>{course.name}</option>
                )
              }) : <option value="" hidden>
                  Chọn khoá học
            </option>}



            </select>
          </div>
          <button onClick={this.send}
            type="button"
            className="contact-us__form__btn contact-us__form__btn--primary"
          >
            gửi
          </button>
        </form>

        <div className="contact-us__sub-info">
          <div className="contact-us__sub-info__brand">{this.props.brand}</div>
          <div className="contact-us__sub-info__title">
            {this.props.title}
          </div>
          <div className="contact-us__sub-info__content">
            {this.props.description}
          </div>
          <div className="contact-us__sub-info__contact-info">
            <div className="contact-us__sub-info__contact-info__item">
              <i className="far fa-envelope icon"></i>
              <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
            </div>
            <div className="contact-us__sub-info__contact-info__item">
              <i className="fas fa-headset icon"></i>
              <a href={`tel:${this.props.phone}`}>{this.props.phone}</a>
            </div>
            <div className="contact-us__sub-info__contact-info__item">
              <i className="fas fa-map-marker-alt icon"></i>
              <a>{this.props.address}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
