import * as React from 'react';
import './addCourse.scss';

export class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      benefits: ['Tốt cho sức khoẻ', 'Tốt cho tim mạch', 'Tăng miễn dịch']
    };
  }
  render() {
    return (
      <div className="add-course">
        <div className="add-course__title">Thông tin cơ bản</div>
        <hr className="divider" />
        <form className="add-course__form">
          <div className="add-course__form__detail">
            <div className="add-course__form__detail__course-name">
              <div className="add-course__title-text">
                Tên khoá học <span>* (bắt buộc)</span>
              </div>
              <input
                className="add-course__input-box"
                placeholder="vd: yoga cộng đồng"
                type="text"
                required
              />
            </div>
            <div className="add-course__form__detail__path">
              <div className="add-course__title-text">
                Đường dẫn <span>* (bắt buộc)</span>
              </div>
              <input
                className="add-course__input-box"
                placeholder="vd: yoga-cong-dong"
                type="text"
                required
              />
            </div>
            <div className="add-course__form__detail__icon">
              <i className="fas fa-file-signature"></i>
            </div>
          </div>
          <div className="add-course__form__detail">
            <div className="add-course__form__detail__icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <div className="add-course__form__detail__benefits">
              <div className="add-course__title-text">Các lợi ích</div>
              <ul className="add-course__form__detail__benefits__list-items">
                {this.state.benefits.map((benefit, index) => {
                  return (
                    <li
                      className="add-course__form__detail__benefits__list-items__item"
                      key={index}
                    >
                      <i className="fas fa-leaf"></i>&nbsp;&nbsp;{benefit}
                    </li>
                  );
                })}
              </ul>
              <input
                className="add-course__input-box"
                placeholder="Thêm lợi ích việc tập Yoga"
                type="text"
              />
              <div className="add-course__form__detail__benefits__add-benefits">
                <button>
                  <i className="fas fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="add-course__form__detail">
            <div className="add-course__title-text">Thêm ảnh khoá học</div>
            <div className="add-course__form__detail__add-photo">
              <button>
                <i className="fas fa-plus-circle"></i>
              </button>
            </div>
            <div className="add-course__form__detail__icon">
              <i className="fas fa-camera-retro"></i>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
