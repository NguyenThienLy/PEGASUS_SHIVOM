import * as React from "react";
import "./activity.scss";

export class Activity extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activities } = this.props;
    return (
      <div className="activity">
        <div className="activity__title">Hoạt động</div>
        <hr className="divider" />
        <ul className="activity__actions">
          {
            activities.map((activity, index) => {
              return (
                <li className="activity__actions__detail" key={index}>
                  <div className="activity__actions__detail__icon">
                    <i className="fab fa-pagelines"></i>
                  </div>
                  <a
                    href='#'
                    className='activity__actions__detail__content'
                  >
                    <div className="activity__actions__detail__content__time">{activity.time} trước</div>
                    <div className="activity__actions__detail__content__text">{activity.content}</div>
                  </a>
                  <button className="activity__actions__detail__btn">Chi tiết</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
