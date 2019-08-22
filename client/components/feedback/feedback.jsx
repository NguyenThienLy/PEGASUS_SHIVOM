import * as React from "react";
import "./feedback.scss";

export class Feedback extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="feedback">
        <div className="feedback__title">
          <span>phản hồi của khách hàng</span>
        </div>
        <br />
        <div className="feedback__form">
          <input placeholder="Vấn đề" className="feedback__form__input" />
          <textarea
            name="message"
            rows="15"
            cols="30"
            placeholder="Nhập ý kiến phản hồi của bạn..."
            className="feedback__form__input"
          />
          <br />
          <button className="feedback__form__btn feedback__form__btn--primary">
            gửi
          </button>
          <br />
        </div>
      </div>
    );
  }
}
