import * as React from "react";
import "./eventHour.scss";

export class EventHour extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { eventHour } = this.props;
    return (
      <div className="eventHour">
        <span className="eventHour__border eventHour__border-left" />
        <span className="eventHour__border eventHour__border-top-left" />
        <span className="eventHour__border eventHour__border-top-right" />
        <span className="eventHour__border eventHour__border-right" />
        <span className="eventHour__border eventHour__border-bottom-left" />
        <span className="eventHour__border eventHour__border-bottom-right" />
        <div className="eventHour__inner">
          <div className="eventHour__inner__weekday">{eventHour.weekday}</div>
          <div className="eventHour__inner__time">
            <span className="eventHour__inner__time__start">
              {eventHour.timeStart}
            </span>
            <span> - </span>
            <span className="eventHour__inner__time__end">
              {eventHour.timeEnd}
            </span>
          </div>
          <div className="eventHour__inner__trainer">{eventHour.trainer}</div>
        </div>
      </div>
    );
  }
}
