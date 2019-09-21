import * as React from "react";
import "./addClassTimeForm.scss";

export class AddClassTimeForm extends React.Component {
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
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    const body = {
      weekday: this.refs.weekday.value,
      timeStart: this.refs.timeStart.value,
      timeEnd: this.refs.timeEnd.value
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
                    <option key={index} value={index}>
                      {weekday}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="add-class-time__form__item">
            <div className="add-class-time__form__item__title">Giờ bắt đầu</div>
            <input
              className="add-class-time__form__item__input"
              placeholder="6:30"
              type="text"
              name="name"
              required
              ref="timeStart"
            />
          </div>
          <div className="add-class-time__form__item">
            <div className="add-class-time__form__item__title">
              Giờ kết thúc
            </div>
            <input
              className="add-class-time__form__item__input"
              placeholder="9:30"
              type="text"
              name="name"
              required
              ref="timeEnd"
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
