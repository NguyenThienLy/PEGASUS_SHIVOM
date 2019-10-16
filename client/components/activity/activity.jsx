import * as React from "react";
import "./activity.scss";
import { Loading } from "../../components";

export class Activity extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activities, staticContent, isFetching } = this.props;

    return (
      <div className="activity">
        <div className="activity__title">{staticContent.nameTable}</div>
        <hr className="divider" />
        {!activities.length && !isFetching && "Dữ liệu trống"}
        {isFetching && !activities.length && <Loading />}
        {!isFetching && activities.length && (
          <ul className="activity__actions">
            {activities.map((activity, index) => {
              return (
                <li className="activity__actions__detail" key={index}>
                  <div className="activity__actions__detail__img">
                    <img src={activity.avatar}></img>
                  </div>
                  <div className="activity__actions__detail__content">
                    <div className="activity__actions__detail__content__time">
                      {activity.header}
                    </div>
                    <div className="activity__actions__detail__content__text">
                      {activity.firstName} {activity.lastName}{" "}
                    </div>
                    <div className="activity__actions__detail__content__suport">
                      {staticContent.content}
                    </div>
                  </div>
                  <div className="activity__actions__detail__btn">
                    {activity.suport}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
