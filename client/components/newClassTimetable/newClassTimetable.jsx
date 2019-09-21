import * as React from "react";
import "./newClassTimetable.scss";

export class NewClassTimetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdays: [
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
        "Chủ nhật"
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.props.handleChange(name, value);
  }
  handleRemove(index) {
    this.props.handleRemove(index);
  }
  render() {
    return (
      <div className="new-class-timetable">
        <div className="new-class-timetable__title">Thời khóa biểu</div>
        <hr className="divider" />
        <div className="new-class-timetable__wrapper">
          {this.props.classTimes.map((classTime, index) => {
            return (
              <div className="new-class-timetable__wrapper__info">
                <div className="new-class-timetable__wrapper__info__item">
                  <div className="new-class-timetable__title-text">
                    Ngày trong tuần
                  </div>
                  <div className="new-class-timetable__select-box">
                    <select
                      required
                      className="new-class-timetable__select-box__select"
                    >
                      <option value="" hidden>
                        Chọn thứ
                      </option>
                      {this.state.weekdays.map((weekday, index) => {
                        return parseInt(classTime.weekday) === index ? (
                          <option selected key={index} value={index}>
                            {weekday}
                          </option>
                        ) : (
                          <option key={index} value={index}>
                            {weekday}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="new-class-timetable__wrapper__info__item">
                  <div className="new-class-timetable__title-text">
                    Giờ bắt đầu
                  </div>
                  <input
                    className="new-class-timetable__input-box"
                    placeholder="6:30"
                    type="text"
                    required
                    value={classTime.timeStart}
                  />
                </div>
                <div className="new-class-timetable__wrapper__info__item">
                  <div className="new-class-timetable__title-text">
                    Giờ kết thúc
                  </div>
                  <input
                    className="new-class-timetable__input-box"
                    placeholder="9:30"
                    type="text"
                    required
                    value={classTime.timeEnd}
                  />
                </div>
                <i
                  class="fas fa-times"
                  onClick={() => this.handleRemove(index)}
                ></i>
              </div>
            );
          })}

          <div className="new-class-timetable__wrapper__add-btn">
            <button type="button" onClick={this.props.showAddClassTimeModal}>
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
