import * as React from "react";
import "./courseInfo.scss";

export class CourseInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { courseInfo } = this.props;
    //console.log("courseInfo", courseInfo);

    return (
      <div className="courseInfo">
        {courseInfo && (
          <div className="courseInfo__name">{courseInfo.name}</div>
        )}

        {courseInfo && (
          <div className="courseInfo__description">{courseInfo.slug}</div>
        )}

        <div className="courseInfo__details">
          <div className="courseInfo__details__row">
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Số lượng học viên
              </div>
              <div className="courseInfo__details__row__holder__content">
                25
              </div>
            </div>
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Thông tin khác
              </div>
              <div className="courseInfo__details__row__holder__content">
                ...
              </div>
            </div>
          </div>
          <div className="courseInfo__details__row">
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Khác
              </div>
              <div className="courseInfo__details__row__holder__content">
                ...
              </div>
            </div>
          </div>
        </div>

        <div className="courseInfo__details">
          <div className="courseInfo__details__row">
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Số lượng học viên
              </div>
              <div className="courseInfo__details__row__holder__content">
                25
              </div>
            </div>
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Thông tin khác
              </div>
              <div className="courseInfo__details__row__holder__content">
                ...
              </div>
            </div>
          </div>
          <div className="courseInfo__details__row">
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Khác
              </div>
              <div className="courseInfo__details__row__holder__content">
                ...
              </div>
            </div>
          </div>
        </div>

        <div className="courseInfo__details">
          <div className="courseInfo__details__row">
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Số lượng học viên
              </div>
              <div className="courseInfo__details__row__holder__content">
                25
              </div>
            </div>
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Thông tin khác
              </div>
              <div className="courseInfo__details__row__holder__content">
                ...
              </div>
            </div>
          </div>
          <div className="courseInfo__details__row">
            <div className="courseInfo__details__row__holder">
              <div className="courseInfo__details__row__holder__title">
                Khác
              </div>
              <div className="courseInfo__details__row__holder__content">
                ...
              </div>
            </div>
          </div>
        </div>

        <div className="courseInfo__timeTable">
          <div className="courseInfo__timeTable__event">
            <div className="courseInfo__timeTable__event__date">thứ hai</div>
            <div className="courseInfo__timeTable__event__class-info">
              <a
                href="#"
                className="courseInfo__timeTable__event__class-info__class-name"
              >
                Cân bằng cơ thể
              </a>
              <div className="courseInfo__timeTable__event__class-info__class-time">
                9.00 - 10.00
              </div>
            </div>
          </div>
          <div className="courseInfo__timeTable__event">
            <div className="courseInfo__timeTable__event__date">thứ ba</div>
            <div className="courseInfo__timeTable__event__class-info">
              <a
                href="#"
                className="courseInfo__timeTable__event__class-info__class-name"
              >
                Cân bằng cơ thể
              </a>
              <div className="courseInfo__timeTable__event__class-info__class-time">
                9.00 - 10.00
              </div>
            </div>
          </div>
          <div className="courseInfo__timeTable__event">
            <div className="courseInfo__timeTable__event__date">thứ tư</div>
          </div>
          <div className="courseInfo__timeTable__event">
            <div className="courseInfo__timeTable__event__date">thứ năm</div>
            <div className="courseInfo__timeTable__event__class-info">
              <a
                href="#"
                className="courseInfo__timeTable__event__class-info__class-name"
              >
                Cân bằng cơ thể
              </a>
              <div className="courseInfo__timeTable__event__class-info__class-time">
                9.00 - 10.00
              </div>
            </div>
          </div>
          <div className="courseInfo__timeTable__event">
            <div className="courseInfo__timeTable__event__date">thứ sáu</div>
          </div>
          <div className="courseInfo__timeTable__event">
            <div className="courseInfo__timeTable__event__date">thứ bảy</div>
            <div className="courseInfo__timeTable__event__class-info">
              <a
                href="#"
                className="courseInfo__timeTable__event__class-info__class-name"
              >
                Cân bằng cơ thể
              </a>
              <div className="courseInfo__timeTable__event__class-info__class-time">
                9.00 - 10.00
              </div>
            </div>
          </div>
          <div className="courseInfo__timeTable__event">
            <div className="courseInfo__timeTable__event__date">chủ nhật</div>
          </div>
        </div>
      </div>
    );
  }
}
