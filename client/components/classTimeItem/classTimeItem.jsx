import * as React from 'react';
import './classTimeItem.scss';

export class ClassTimeItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { weekday, timeStart, timeEnd, topic } = this.props;
    return (
      <div className="class-time-item">
        <span className="class-time-item__border class-time-item__border-left" />
        <span className="class-time-item__border class-time-item__border-top-left" />
        <span className="class-time-item__border class-time-item__border-top-right" />
        <span className="class-time-item__border class-time-item__border-right" />
        <span className="class-time-item__border class-time-item__border-bottom-left" />
        <span className="class-time-item__border class-time-item__border-bottom-right" />
        <div className="class-time-item__inner">
          <div className="class-time-item__inner__weekday">{weekday}</div>
          <div className="class-time-item__inner__topic">{topic}</div>
          <div className="class-time-item__inner__time">
            <span className="class-time-item__inner__time__start">
              {timeStart.hour}:
              {timeStart.minute === 0 ? '00' : timeStart.minute}
            </span>
            <span> - </span>
            <span className="class-time-item__inner__time__end">
              {timeEnd.hour}:{timeEnd.minute === 0 ? '00' : timeEnd.minute}
            </span>
          </div>
          {/* <div className="class-time-item__inner__trainer">
            {classTimeItem.trainer}
          </div> */}
        </div>
      </div>
    );
  }
}
