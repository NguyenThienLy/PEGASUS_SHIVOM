import * as React from "react";
import "./feedbackNoti.scss";

export class FeedbackNoti extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="feedback-noti">
        <div className="feedback-noti__avt">
          <img
            src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-gallery-img-3a.jpg"
            alt=""
          />
        </div>
        <div className="feedback-noti__info">
          <div className="feedback-noti__info__title">
            {" "}
            Minh Lê Nguyễn đã làm chi đó <span /> 2 ngày trước
          </div>

          <div className="feedback-noti__info__short-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </div>
          <div className="feedback-noti__info__func-group">
            <div className="feedback-noti__info__func-group__item accept">
              <i className="fas fa-check" /> Chấp nhận
            </div>
            <div className="feedback-noti__info__func-group__item decline">
              {" "}
              <i className="fas fa-times" /> Xoá
            </div>
            <div className="feedback-noti__info__func-group__item">
              Chỉnh sửa
            </div>
          </div>
        </div>
      </div>
    );
  }
}
