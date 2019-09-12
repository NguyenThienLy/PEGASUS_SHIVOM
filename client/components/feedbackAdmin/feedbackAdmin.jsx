import * as React from "react";
import * as moment from "moment";

import "./feedbackAdmin.scss";

export class FeedbackAdmin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { feedbackAdmins, staticContent, timeKey } = this.props;
    //const { nameTable } = this.props;

    // console.log("activities", activities);
    return (
      <div className="feedbackAdmin">
        <div className="feedbackAdmin__title">{staticContent.nameTable}</div>
        <hr className="divider" />
        <ul className="feedbackAdmin__actions">
          {feedbackAdmins.map((feedbackAdmin, index) => {
            return (
              <li className="feedbackAdmin__actions__detail" key={index}>
                <div className="feedbackAdmin__actions__detail__img">
                  <img src={feedbackAdmin.student.avatar}></img>
                </div>
                <a href="#" className="feedbackAdmin__actions__detail__content">
                  <div className="feedbackAdmin__actions__detail__content__time">
                    {moment().diff(feedbackAdmin.createdAt, "days") +
                      " ngày trước"}
                  </div>
                  <div className="feedbackAdmin__actions__detail__content__time">
                    {feedbackAdmin.student.firstName}{" "}
                    {feedbackAdmin.student.lastName}
                    {" ("} {feedbackAdmin.student.point} {"điểm )"}
                  </div>
                  <div className="feedbackAdmin__actions__detail__content__text">
                    {feedbackAdmin.content}
                  </div>
                </a>
                <a href="#" className="feedbackAdmin__actions__detail__btn">
                  Trả lời
                </a>
                <a href="#" className="feedbackAdmin__actions__detail__btn">
                  Bỏ qua
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
