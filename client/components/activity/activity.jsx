import * as React from "react";
import "./activity.scss";

export class Activity extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="activity">
        <div className="activity__title">hoạt động</div>
        <hr className="divider" />
        <ul className="activity__actions">
          <li className="activity__actions__detail">
            <span className="activity__actions__detail__time">
              23 mins trước
            </span>{" "}
            <br />
            <a href="#" className="activity__actions__detail__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </a>
          </li>
          <li className="activity__actions__detail">
            <span className="activity__actions__detail__time">
              23 mins trước
            </span>{" "}
            <br />
            <a href="#" className="activity__actions__detail__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </a>
          </li>
          <li className="activity__actions__detail">
            <span className="activity__actions__detail__time">
              23 mins trước
            </span>{" "}
            <br />
            <a href="#" className="activity__actions__detail__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
