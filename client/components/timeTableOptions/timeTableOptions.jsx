import * as React from "react";
import "./timeTableOptions.scss";
import { HoverDivAnimation } from "../hoverDivAnimation/hoverDivAnimation";

import * as _ from "lodash";

export class TimeTableOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="time-table-options__table-events__class-time">
                    Buổi sáng
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
                <td />
              </tr>
              <tr>
                <td>
                  <div className="time-table-options__table-events__class-time">
                    Buổi trưa
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
                <td />
              </tr>
              <tr>
                <td>
                  <div className="time-table-options__table-events__class-time">
                    Buổi chiều
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
                <td />
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
