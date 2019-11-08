import * as React from 'react';
import './updateClassTimetable.scss';

export class UpdateClassTimetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdays: {
        monday: {
          value: 1,
          text: 'Thứ hai'
        },
        tuesday: {
          value: 2,
          text: 'Thứ ba'
        },
        wednesday: {
          value: 3,
          text: 'Thứ tư'
        },
        thursday: {
          value: 4,
          text: 'Thứ năm'
        },
        friday: {
          value: 5,
          text: 'Thứ sáu'
        },
        saturday: {
          value: 6,
          text: 'Thứ bảy'
        },
        sunday: {
          value: 7,
          text: 'Chủ nhật'
        }
      }
    };
  }
  handleRemove(index) {
    this.props.handleRemove(index);
  }
  render() {
    return (
      <div className="update-class-timetable">
        <div className="update-class-timetable__title">Thời khóa biểu</div>
        <hr className="divider" />
        <div className="update-class-timetable__wrapper">
          {this.props.timeTable.map((timeTableItem, index) => {
            return (
              <div className="update-class-timetable__wrapper__info">
                <div className="update-class-timetable__wrapper__info__item">
                  <div className="update-class-timetable__title-text">
                    Ngày trong tuần
                  </div>

                  <input
                    className="update-class-timetable__input-box"
                    value={this.state.weekdays[timeTableItem.dayOfWeek].text}
                    type="text"
                    required
                    readOnly={true}
                  />
                </div>
                <div className="update-class-timetable__wrapper__info__item">
                  <div className="update-class-timetable__title-text">
                    Giờ bắt đầu
                  </div>
                  <input
                    className="update-class-timetable__input-box"
                    value={`${timeTableItem.startTime.hour}:${timeTableItem.startTime.minute}`}
                    type="text"
                    required
                    readOnly={true}
                  />
                </div>
                <div className="update-class-timetable__wrapper__info__item">
                  <div className="update-class-timetable__title-text">
                    Giờ kết thúc
                  </div>
                  <input
                    className="update-class-timetable__input-box"
                    value={`${timeTableItem.endTime.hour}:${timeTableItem.endTime.minute}`}
                    type="text"
                    required
                    readOnly={true}
                  />
                </div>
                <i
                  class="fas fa-times"
                  onClick={() => this.handleRemove(index)}
                ></i>
              </div>
            );
          })}

          <div className="update-class-timetable__wrapper__add-btn">
            <button type="button" onClick={this.props.showAddClassTimeModal}>
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
