import * as React from "react";
import "./timeTable.scss";
import { HoverDivAnimation } from "../hoverDivAnimation/hoverDivAnimation";

export class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {
          name: "tất cả"
        },
        {
          name: "yoga cộng đồng"
        },
        {
          name: "yoga trẻ em"
        },
        {
          name: "yoga người cao tuổi"
        },
        {
          name: "yoga trị bệnh"
        }
      ]
    };
  }

  render() {
    return (
      <div className="time-table">
        
        <div className="time-table__tabs">
          <ul>
            {this.state.courses.map(course => {
              return (
                <li>
                  <HoverDivAnimation title={course.name} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="time-table__events">
          <div className="time-table__events__background" />
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
                  <div className="time-table__events__class-time">09.00</div>
                </td>
                <td>
                  <div className="time-table__events__class-info time-table__events__my-tooltip">
                    <div className="time-table__events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__events__class-info__class-name"
                      href="https://dalia.elated-themes.com/events/body-balance/"
                      title="Body Balance"
                    >
                       Cân bằng <br/>cơ thể
                    </a>
                    <div className="time-table__events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td>
                <div className="time-table__events__class-info time-table__events__my-tooltip">
                    <div className="time-table__events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__events__class-info__class-name"
                      href="https://dalia.elated-themes.com/events/body-balance/"
                      title="Body Balance"
                    >
                       Cân bằng <br/>cơ thể
                    </a>
                    <div className="time-table__events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
                <td>
                <div className="time-table__events__class-info time-table__events__my-tooltip">
                    <div className="time-table__events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__events__class-info__class-name"
                      href="https://dalia.elated-themes.com/events/body-balance/"
                      title="Body Balance"
                    >
                      Cân bằng <br/>cơ thể
                    </a>
                    <div className="time-table__events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
                <td>
                <div className="time-table__events__class-info time-table__events__my-tooltip">
                    <div className="time-table__events__my-tooltip__content">
                      45 phút
                      <i />
                    </div>
                    <a
                      className="time-table__events__class-info__class-name"
                      href="https://dalia.elated-themes.com/events/body-balance/"
                      title="Body Balance"
                    >
                       Cân bằng <br/>cơ thể
                    </a>
                    <div className="time-table__events__class-info__class-teacher">
                      Ngọc Hạnh
                    </div>
                  </div>
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
