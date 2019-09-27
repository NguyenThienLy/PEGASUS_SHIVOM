import * as React from "react";
import "./feedback.scss";

export class Feedback extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="feedback">
        {/* <div className="feedback__title">
          <span>phản hồi với trung tâm</span>
        </div>
        <br /> */}
        <form className="feedback__form">
          <input
            type="text"
            placeholder="Nhập vấn đề cần phản hồi đến trung tâm"
            className="feedback__form__input"
            //name="title"
            //onChange={this.handleChange}
          />
          <textarea
            rows="10"
            maxLength="200"
            placeholder="Ý kiến về vấn đề này"
            className="feedback__form__text-area"
            //name="message"
            //onChange={this.handleChange}
          ></textarea>

          <button className="feedback__form__button">gửi</button>
        </form>
      </div>
    );
  }
}
