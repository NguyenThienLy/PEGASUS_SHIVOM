import * as React from "react";
import * as moment from "moment";

import "./activity.scss";

export class Activity extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activities, staticContent, timeKey } = this.props;
    //const { nameTable } = this.props;

    // console.log("activities", activities);
    return (
      <div className="activity">
        <div className="activity__title">{staticContent.nameTable}</div>
        <hr className="divider" />
        <ul className="activity__actions">
          {activities.map((activity, index) => {
            return (
              <li className="activity__actions__detail" key={index}>
                <div className="activity__actions__detail__img">
                  <img src={activity.avatar}></img>
                </div>
                <a href="#" className="activity__actions__detail__content">
                  <div className="activity__actions__detail__content__time">
                    {activity.header}
                  </div>
                  <div className="activity__actions__detail__content__text">
                    {activity.firstName} {activity.lastName}{" "}
                    {staticContent.content}
                  </div>
                </a>
                <a href="#" className="activity__actions__detail__btn">
                  {activity.suport}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
