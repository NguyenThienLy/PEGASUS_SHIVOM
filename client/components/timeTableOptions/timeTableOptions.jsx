import * as React from 'react';
import './timeTableOptions.scss';
import { HoverDivAnimation } from '../hoverDivAnimation/hoverDivAnimation';

import * as _ from 'lodash';

import { api } from '../../services';

export class TimeTableOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfWeekMapping: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ],
      dayOfWeekVietnamese: [
        'Thứ hai',
        'Thứ ba',
        'Thứ tư',
        'Thứ năm',
        'Thứ sáu',
        'Thứ bảy',
        'Chủ nhật'
      ],
      timeTableListData: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      },
      timeTableData: {
        morning: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },
        afternoon: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },
        night: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        }
      },
      currentCourses: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.refreshTimeTable = this.refreshTimeTable.bind(this);
    this.handleChooseTimeTableItem = this.handleChooseTimeTableItem.bind(this);
  }
  componentDidMount() {
    const courseIds = this.props.courses.map(course => {
      return course._id;
    });
    if (courseIds.length === 0) {
      this.refreshTimeTable();
    } else if (!_.isEqual(courseIds.sort(), this.state.currentCourses.sort())) {
      this.setState({ currentCourses: courseIds });
      this.fetchData(courseIds);
    }
  }
  componentDidUpdate(prevProps) {
    const courseIds = this.props.courses.map(course => {
      return course._id;
    });
    if (courseIds.length === 0) {
      this.refreshTimeTable();
    } else if (!_.isEqual(courseIds.sort(), this.state.currentCourses.sort())) {
      this.setState({ currentCourses: courseIds });
      this.fetchData(courseIds);
    }
  }
  refreshTimeTable() {
    this.setState({
      timeTableListData: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      },
      timeTableData: {
        morning: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },
        afternoon: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },
        night: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        }
      },
      currentCourses: []
    });
  }
  checkPageValidation() {
    let isValid = true;

    for (var selectedCourse of this.props.courses) {
      if (selectedCourse.timeTables.length === 0) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }
  handleChooseTimeTableItem(courseId, timeTableItemId) {
    this.props.handleChooseTimeTableItem(courseId, timeTableItemId);
    this.props.handleIsValid(this.props.pageNumber, this.checkPageValidation());
  }
  async fetchData(courseIds) {
    const {
      results: {
        objects: { rows: timeTables }
      }
    } = await api.course.getAllTimeTable({
      query: {
        filter: {
          course: { $in: courseIds }
        }
      }
    });
    let timeTableData = {
      morning: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
      },
      afternoon: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
      },
      night: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
      }
    };
    let timeTableListData = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    };
    const LAST_MORNING_HOUR = 720;
    const LAST_AFTERNOON_HOUR = 1080;
    let timeTableItems = timeTables.forEach(timeTable => {
      const courseName = timeTable.course.name;
      const className = timeTable.class.name;
      const teacherName = timeTable.class.teacher
        ? timeTable.class.teacher.firstName +
          ' ' +
          timeTable.class.teacher.lastName
        : null;

      timeTable.items.forEach(item => {
        let data = [
          <div
            className="time-table-options__table-events__class-info"
            onClick={() => {
              this.handleChooseTimeTableItem(timeTable.course._id, item._id);
            }}
          >
            <input type="checkbox" name="placeholder" />
            <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
              <div className="time-table-options__table-events__class-info__my-tooltip__content">
                {item.endTime.number - item.startTime.number} phút
                <i />
              </div>
              <div
                className="time-table-options__table-events__class-info__wrapper__class-name"
                href="#"
                title="Body Balance"
              >
                {courseName} <br />
                {item.startTime.hour}:
                {item.startTime.minute === 0 ? '00' : item.startTime.minute} -{' '}
                {item.endTime.hour}:
                {item.endTime.minute === 0 ? '00' : item.endTime.minute}
              </div>
              <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                {teacherName}
              </div>
            </div>
          </div>
        ];
        // let listItemData = (
        //   <div
        //     className={`time-table__list-events__event__class-info time-table__list-events__event__class-info-${timeTable.course._id}`}
        //     key={item._id}
        //   >
        //     <a
        //       href="#"
        //       className="time-table__list-events__event__class-info__class-name"
        //     >
        //       {courseName}
        //     </a>
        //     <div className="time-table__list-events__event__class-info__class-time">
        //       {item.startTime.hour}:
        //       {item.startTime.minute === 0 ? "00" : item.startTime.minute} -{" "}
        //       {item.endTime.hour}:
        //       {item.endTime.minute === 0 ? "00" : item.endTime.minute}
        //     </div>
        //   </div>
        // );
        // timeTableListData[item.dayOfWeek].push(listItemData);
        if (item.endTime.number < LAST_MORNING_HOUR) {
          timeTableData.morning[item.dayOfWeek].push(data);
        } else if (item.endTime.number < LAST_AFTERNOON_HOUR) {
          timeTableData.afternoon[item.dayOfWeek].push(data);
        } else {
          timeTableData.night[item.dayOfWeek].push(data);
        }
      });
    });

    this.setState({ timeTableData });
  }
  render() {
    return (
      <div className="time-table-options">
        <div className="course-options__title">Chọn lịch học</div>
        <hr className="divider" />
        <div className="time-table-options__table-events">
          <table>
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Thứ hai</th>
                <th>Thứ ba</th>
                <th>Thứ tư</th>
                <th>Thứ năm</th>
                <th>Thứ sáu</th>
                <th>Thứ bảy</th>
                <th>Chủ nhật</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="time-table-options__table-events__class-time">
                    Buổi sáng
                  </div>
                </td>
                {this.state.dayOfWeekMapping.map(dayOfWeek => {
                  return (
                    <td key={dayOfWeek}>
                      {this.state.timeTableData.morning[dayOfWeek]}
                    </td>
                  );
                })}
                {/* <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Duỗi người
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td /> */}
              </tr>
              <tr>
                <td>
                  <div className="time-table-options__table-events__class-time">
                    Buổi trưa
                  </div>
                </td>
                {this.state.dayOfWeekMapping.map(dayOfWeek => {
                  return (
                    <td key={dayOfWeek}>
                      {this.state.timeTableData.afternoon[dayOfWeek]}
                    </td>
                  );
                })}
                {/* <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td /> */}
              </tr>
              <tr>
                <td>
                  <div className="time-table-options__table-events__class-time">
                    Buổi chiều
                  </div>
                </td>
                {this.state.dayOfWeekMapping.map(dayOfWeek => {
                  return (
                    <td key={dayOfWeek}>
                      {this.state.timeTableData.night[dayOfWeek]}
                    </td>
                  );
                })}
                {/* <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table-options__table-events__class-info">
                    <input type="checkbox" name="placeholder" />
                    <div className="time-table-options__table-events__class-info__wrapper time-table-options__table-events__class-info__my-tooltip">
                      <div className="time-table-options__table-events__class-info__my-tooltip__content">
                        45 phút
                        <i />
                      </div>
                      <div
                        className="time-table-options__table-events__class-info__wrapper__class-name"
                        href="#"
                        title="Body Balance"
                      >
                        Cân bằng <br />
                        cơ thể
                      </div>
                      <div className="time-table-options__table-events__class-info__wrapper__class-teacher">
                        Ngọc Hạnh
                      </div>
                    </div>
                  </div>
                </td>
                <td /> */}
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="time-table-options__button">
          <button>
            Tiếp tục <i className="fas fa-chevron-right"></i>
          </button>
        </div> */}
      </div>
    );
  }
}
