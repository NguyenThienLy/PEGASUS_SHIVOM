import * as React from "react";
import * as moment from "moment";
import { Loading } from "../../components";

import { api } from '../../services'
import Swal from 'sweetalert2'

import "./feedbackAdmin.scss";

export class FeedbackAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.updateConfirmFeedbacks = this.updateConfirmFeedbacks.bind(this);
    this.updateIgnoreFeedbacks = this.updateIgnoreFeedbacks.bind(this);
  }

  updateConfirmFeedbacks(feedback) {
    const body = {
      studentId: feedback.student._id,
      isReply: true,
      content: "Phản hồi về chất lượng dịch vụ",
      point: 1
    };

    this.props.updateConfirmFeedbacks(feedback._id, body);
    this.forceUpdate()
  }

  updateIgnoreFeedbacks(feedback) {
    const body = {
      isReply: true
    };

    this.props.updateIgnoreFeedbacks(feedback._id, body);
    this.forceUpdate()
  }

  render() {
    const { feedbackAdmins, staticContent, isFetching, isEmpty } = this.props;

    return (
      <div className="feedbackAdmin">
        <div className="feedbackAdmin__title">{staticContent.nameTable}</div>
        <hr className="divider" />
        {!isEmpty && !isFetching && "Dữ liệu trống"}
        {isFetching && !isEmpty && <Loading />}
        {!isFetching && isEmpty && (
          <ul className="feedbackAdmin__actions">
            {feedbackAdmins.map((feedbackAdmin, index) => {
              return (
                <li className="feedbackAdmin__actions__detail" key={index}>
                  <div className="feedbackAdmin__actions__detail__img">
                    <img src={(feedbackAdmin.student || {}).avatar}></img>
                  </div>
                  <div className="feedbackAdmin__actions__detail__content">
                    <div className="feedbackAdmin__actions__detail__content__time">
                      {moment().diff(feedbackAdmin.createdAt, "days") +
                        " ngày trước"}
                    </div>
                    <div className="feedbackAdmin__actions__detail__content__time">
                      {(feedbackAdmin.student || {}).firstName}{" "}
                      {(feedbackAdmin.student || {}).lastName}
                      {" ("}
                      {(feedbackAdmin.student || {}).point}
                      {" điểm)"}
                    </div>
                    <div className="feedbackAdmin__actions__detail__content__text">
                      {feedbackAdmin.content}
                    </div>
                  </div>
                  <button className="feedbackAdmin__actions__detail__btn" onClick={() => {
                    this.updateConfirmFeedbacks(feedbackAdmins[index]);
                  }}>
                    Xác nhận
                </button>
                  <button className="feedbackAdmin__actions__detail__btn" onClick={() => {
                    this.updateIgnoreFeedbacks(feedbackAdmins[index]);
                  }}>
                    Bỏ qua
                </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
