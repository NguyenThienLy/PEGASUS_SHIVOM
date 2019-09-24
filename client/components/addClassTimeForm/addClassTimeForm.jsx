import * as React from "react";
import "./addClassTimeForm.scss";
import TimeKeeper from 'react-timekeeper';
import { TimePickerModal } from '../index'

export class AddClassTimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdays: [
        {
          name: "Thứ hai",
          value: "monday"
        },
        {
          name: "Thứ ba",
          value: "tuesday"
        },
        {
          name: "Thứ tư",
          value: "wednesday"
        },
        {
          name: "Thứ năm",
          value: "thursday"
        },
        {
          name: "Thứ sáu",
          value: "friday"
        },
        {
          name: "Thứ bảy",
          value: "saturday"
        },
        {
          name: "Chủ nhật",
          value: "sunday"
        }
      ],
      startTime: {
        show: false,
        value: "6:30 am",
        hour: 6,
        minute: 30
      },
      endTime: {
        show: false,
        value: "7:00 am",
        hour: 7,
        minute: 0
      },
      startAvailableCheckinTime: {
        show: false,
        value: "6:15 am",
        hour: 6,
        minute: 15
      },
    };
    this.submit = this.submit.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.toggleTimekeeper = this.toggleTimekeeper.bind(this)
  }
  handleTimeChange(key, time) {
    console.log("key: ", key)
    console.log("time: ", time)
    this.setState({
      [key]: {
        show: this.state[key].show,
        value: time.formatted,
        hour: time.hour24,
        minute: time.minute
      }
    })
  }
  toggleTimekeeper(key) {
    this.state[key].show = !this.state[key].show
    this.setState({ key: this.state[key] })
  }
  submit(e) {
    e.preventDefault();
    const body = {
      dayOfWeek: this.refs.weekday.value,
      startTime: {
        hour: this.state.startTime.hour,
        minute: this.state.startTime.minute
      },
      endTime: {
        hour: this.state.endTime.hour,
        minute: this.state.endTime.minute
      },
      startAvailableCheckinTime: {
        hour: this.state.startAvailableCheckinTime.hour,
        minute: this.state.startAvailableCheckinTime.minute
      },
      room: this.refs.room.value
    };
    $(".add-class-time__form__item__input").val("");
    $(".add-class-time__form__item__select-box__select").val("");
    this.props.handleAddClassTime(body);
  }
  render() {
    return (
      <React.Fragment>
        <form className="add-class-time__form" onSubmit={this.submit}>
          <div className="add-class-time__form__title">thêm lịch biểu</div>
          <div className="add-class-time__form__item">
            <div className="add-class-time__form__item__title">
              Ngày trong tuần
            </div>
            <div className="add-class-time__form__item__select-box">
              <select
                required
                className="add-class-time__form__item__select-box__select"
                ref="weekday"
              >
                <option value="" hidden>
                  Chọn thứ
                </option>
                {this.state.weekdays.map((weekday, index) => {
                  return (
                    <option key={index} value={weekday.value}>
                      {weekday.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="add-class-time__form__item">
            <div className="add-class-time__form__item__title">
              Phòng tập
            </div>
            <div className="add-class-time__form__item__select-box">
              <select
                required
                className="add-class-time__form__item__select-box__select"
                ref="room"
              >
                <option value="" hidden>
                  Chọn phòng
                </option>
                {this.props.rooms.map((room, index) => {
                  return (
                    <option key={index} value={room._id}>
                      {room.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="add-class-time__form__item">
            <div className="add-class-time__form__item__title">Giờ bắt đầu</div>
            {/* {this.state.startTime.show ? <TimeKeeper
              time={this.state.startTime.value}
              onChange={(time) => { return this.handleTimeChange("startTime", time) }}
              onDoneClick={() => {
                this.toggleTimekeeper("startTime")
              }}
              switchToMinuteOnHourSelect={true}
            /> : null} */}
            <TimePickerModal varName="startTime" time={this.state.startTime.time} show={this.state.startTime.show} hideModal={this.toggleTimekeeper} handleTimeChange={this.handleTimeChange} />
            <input
              className="add-class-time__form__item__input"
              value={this.state.startTime.value}
              type="text"
              name="name"
              required
              ref="timeStart"
              onClick={() => { this.toggleTimekeeper("startTime") }}
            />
          </div>
          <div className="add-class-time__form__item">
            <div className="add-class-time__form__item__title">
              Giờ kết thúc
            </div>
            {/* {this.state.endTime.show ? <TimeKeeper
              time={this.state.endTime.value}
              onChange={(time) => { return this.handleTimeChange("endTime", time) }}
              onDoneClick={() => {
                this.toggleTimekeeper("endTime")
              }}
              switchToMinuteOnHourSelect={true}
            /> : null} */}
            <TimePickerModal varName="endTime" time={this.state.endTime.time} show={this.state.endTime.show} hideModal={this.toggleTimekeeper} handleTimeChange={this.handleTimeChange} />
            <input
              className="add-class-time__form__item__input"
              value={this.state.endTime.value}
              type="text"
              name="name"
              onClick={() => { this.toggleTimekeeper("endTime") }}
              required
              ref="timeEnd"
            />
          </div>
          <div className="add-class-time__form__item">
            <div className="add-class-time__form__item__title">
              Giờ bắt đầu checkin
            </div>
            {/* {this.state.endTime.show ? <TimeKeeper
              time={this.state.endTime.value}
              onChange={(time) => { return this.handleTimeChange("endTime", time) }}
              onDoneClick={() => {
                this.toggleTimekeeper("endTime")
              }}
              switchToMinuteOnHourSelect={true}
            /> : null} */}
            <TimePickerModal varName="startAvailableCheckinTime" time={this.state.startAvailableCheckinTime.time} show={this.state.startAvailableCheckinTime.show} hideModal={this.toggleTimekeeper} handleTimeChange={this.handleTimeChange} />
            <input
              className="add-class-time__form__item__input"
              value={this.state.startAvailableCheckinTime.value}
              type="text"
              name="startAvailableCheckinTime"
              onClick={() => { this.toggleTimekeeper("startAvailableCheckinTime") }}
              required
              ref="startAvailableCheckinTime"
            />
          </div>
          <button
            type="submit"
            className="add-class-time__form__btn add-class-time__form__btn--primary"
          >
            thêm
          </button>
        </form>
      </React.Fragment>
    );
  }
}
