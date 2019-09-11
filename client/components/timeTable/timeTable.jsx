import * as React from "react";
import "./timeTable.scss";
import { HoverDivAnimation } from "../hoverDivAnimation/hoverDivAnimation";

import * as _ from 'lodash'

export class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "all",
      dayOfWeekMapping: [
        "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
      ],
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
      }
    };
  }
  componentDidMount() {

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
    }
    const LAST_MORNING_HOUR = 720
    const LAST_AFTERNOON_HOUR = 1080
    let timeTableItems = this.props.timeTables.forEach(timeTable => {
      const courseName = timeTable.course.name
      const className = timeTable.class.name
      const teacherName = timeTable.class.teacher ? timeTable.class.teacher.firstName + " " + timeTable.class.teacher.lastName : null

      timeTable.items.forEach(item => {
        // let data = {
        //   startTime: item.startTime,
        //   endTime: item.endTime,
        //   dayOfWeek: item.dayOfWeek,
        //   dayOfweekText: sorter[item.dayOfWeek].text,
        //   course: courseName,
        //   class: className,
        //   teacher: teacherName
        // }
        let data = (<div className={`time-table__table-events__class-info time-table__table-events__class-info-${timeTable.course._id} time-table__table-events__my-tooltip`}>
          <div className="time-table__table-events__my-tooltip__content" >
            {item.endTime.number - item.startTime.number} phút
          <i />
          </div>
          <a
            className="time-table__table-events__class-info__class-name"
            href="#"
            title="Body Balance"
          >
            {courseName} <br />{item.startTime.hour}:{item.startTime.minute === 0 ? "00" : item.startTime.minute} - {item.endTime.hour}:{item.endTime.minute === 0 ? "00" : item.endTime.minute}
          </a>
          <div className="time-table__table-events__class-info__class-teacher">
            {teacherName}
          </div>
        </div>)
        if (item.endTime.number < LAST_MORNING_HOUR) {
          timeTableData.morning[item.dayOfWeek].push(data)
        } else if (item.endTime.number < LAST_AFTERNOON_HOUR) {
          timeTableData.afternoon[item.dayOfWeek].push(data)
        } else {
          timeTableData.night[item.dayOfWeek].push(data)
        }
      })
    })

    console.log("Time table items: ", timeTableData)
    this.setState({ timeTableData })
  }
  changeTab = (tabId) => {
    console.log("change tab: ", tabId)
    this.setState({ currentTab: tabId })
    if (tabId === "all") {
      $("div[class*='time-table__table-events__class-info-']").show()
    } else {


      //$(`div:not(.time-table__table-events__class-info-${tabId})`).hide()
      $("div[class*='time-table__table-events__class-info-']").not($(`.time-table__table-events__class-info-${tabId}`)).hide()
      $(`.time-table__table-events__class-info-${tabId}`).show()
    }
  }
  render() {
    return (
      <div className="time-table">
        <div className="time-table__tabs">
          <ul>
            <li onClick={() => { return this.changeTab("all") }} className={`time-table__tabs__active`}>
              <HoverDivAnimation title="Tất cả" />
            </li>
            {this.props.courses.items.map(course => {
              return (

                <li onClick={() => { return this.changeTab(course._id) }}>
                  <HoverDivAnimation title={course.name} />
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div className="time-table__list-events">
          <div className="time-table__list-events__event">
            <div className="time-table__list-events__event__date">thứ hai</div>
            <div className="time-table__list-events__event__class-info">
              <a
                href="#"
                className="time-table__list-events__event__class-info__class-name"
              >
                Cân bằng cơ thể
              </a>
              <div className="time-table__list-events__event__class-info__class-time">
                9.00 - 10.00
              </div>
            </div>
          </div>
          <div className="time-table__list-events__event">
            <div className="time-table__list-events__event__date">thứ ba</div>
            <div className="time-table__list-events__event__class-info">
              <a
                href="#"
                className="time-table__list-events__event__class-info__class-name"
              >
                Duỗi người
              </a>
              <div className="time-table__list-events__event__class-info__class-time">
                9.00 - 10.00
              </div>
            </div>
          </div>
          <div className="time-table__list-events__event">
            <div className="time-table__list-events__event__date">thứ tư</div>
          </div>
          <div className="time-table__list-events__event">
            <div className="time-table__list-events__event__date">thứ năm</div>
            <div className="time-table__list-events__event__class-info">
              <a
                href="#"
                className="time-table__list-events__event__class-info__class-name"
              >
                Cân bằng cơ thể
              </a>
              <div className="time-table__list-events__event__class-info__class-time">
                9.00 - 10.00
              </div>
            </div>
          </div>
          <div className="time-table__list-events__event">
            <div className="time-table__list-events__event__date">thứ sáu</div>
          </div>
          <div className="time-table__list-events__event">
            <div className="time-table__list-events__event__date">thứ bảy</div>
            <div className="time-table__list-events__event__class-info">
              <a
                href="#"
                className="time-table__list-events__event__class-info__class-name"
              >
                Cân bằng cơ thể
              </a>
              <div className="time-table__list-events__event__class-info__class-time">
                9.00 - 10.00
              </div>
            </div>
          </div>
          <div className="time-table__list-events__event">
            <div className="time-table__list-events__event__date">chủ nhật</div>
          </div>
        </div> */}
        <div className="time-table__table-events">
          <div className="time-table__table-events__background" />
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
                  <div className="time-table__table-events__class-time">
                    Buổi sáng
                  </div>
                </td>
                {this.state.dayOfWeekMapping.map(dayOfWeek => {
                  return (
                    <td>
                      {this.state.timeTableData.morning[dayOfWeek]}
                    </td>
                  )
                })}
                {/* <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Duỗi người
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td /> */}
              </tr>
              <tr>
                <td>
                  <div className="time-table__table-events__class-time">
                    Buổi chiều
                  </div>
                </td>
                {this.state.dayOfWeekMapping.map(dayOfWeek => {
                  return (
                    <td>
                      {this.state.timeTableData.afternoon[dayOfWeek]}
                    </td>
                  )
                })}
                {/* <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Duỗi người
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td /> */}
              </tr>
              <tr>
                <td>
                  <div className="time-table__table-events__class-time">
                    Buổi tối
                  </div>
                </td>
                {this.state.dayOfWeekMapping.map(dayOfWeek => {
                  return (
                    <td>
                      {this.state.timeTableData.night[dayOfWeek]}
                    </td>
                  )
                })}
                {/* <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Duỗi người
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
                <td>
                  <div className="time-table__table-events__class-info time-table__table-events__my-tooltip">
                    <div className="time-table__table-events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__table-events__class-info__class-name"
                      href="#"
                      title="Body Balance"
                    >
                      Cân bằng <br />
                      cơ thể
                    </a>
                    <div className="time-table__table-events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td /> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
