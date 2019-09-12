import * as React from 'react';
import "./addCourse.scss"

export class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            benefits: [
                'Tốt cho sức khoẻ',
                'Tốt cho tim mạch',
                'Tăng miễn dịch'
            ]
        }

    }
    render() {
        return (
            <div className="course-info">
                <div className="course-info__title">Thông tin cơ bản</div>
                <hr className="divider" />
                <form className="course-info__form">
                    <div className="course-info__form__detail">
                        <div className="course-info__form__detail__course-name">
                            <div className="course-info__title-text">Tên khoá học <span>* (bắt buộc)</span></div>
                            <input
                                className="course-info__input-box"
                                placeholder="vd: yoga cộng đồng"
                                type="text"
                                required
                            />
                        </div>
                        <div className="course-info__form__detail__path">
                            <div className="course-info__title-text">Đường dẫn <span>* (bắt buộc)</span></div>
                            <input
                                className="course-info__input-box"
                                placeholder="vd: yoga-cong-dong"
                                type="text"
                                required
                            />
                        </div>
                        <div className="course-info__form__detail__icon"><i className="fas fa-file-signature"></i></div>
                    </div>
                    <div className="course-info__form__detail">
                        <div className="course-info__form__detail__icon"><i className="fas fa-heartbeat"></i></div>
                        <div className="course-info__form__detail__benefits">
                            <div className="course-info__title-text">Các lợi ích</div>
                            <ul className="course-info__form__detail__benefits__list-items">
                                {
                                    this.state.benefits.map((benefit, index) => {
                                        return <li className="course-info__form__detail__benefits__list-items__item" key={index}>
                                            <i class="fas fa-leaf"></i>&nbsp;&nbsp;{benefit}
                                        </li>
                                    })
                                }
                            </ul>
                            <input
                                className="course-info__input-box"
                                placeholder="Thêm lợi ích việc tập Yoga"
                                type="text"
                            />
                            <div className="course-info__form__detail__benefits__add-benefits">
                                <button>
                                    <i className="fas fa-plus-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="course-info__form__detail">
                        <div className="course-info__title-text">Thêm ảnh khoá học</div>
                        <div className="course-info__form__detail__add-photo">
                            <button><i class="fas fa-plus-circle"></i></button>
                        </div>
                        <div className="course-info__form__detail__icon"><i class="fas fa-camera-retro"></i></div>
                    </div>
                </form>
            </div>
        )
    }
}