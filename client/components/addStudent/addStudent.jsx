import * as React from "react";
import "./addStudent.scss";


export class AddStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="student-info">
                <div className="student-info__title">Thông tin cơ bản</div>
                <hr className="divider" />
                <form className="student-info__form">
                    <div className="student-info__form__member-info">
                        <div className="student-info__form__member-info__card-number">
                            <div className="student-info__title-text">Mã số thẻ <span>* (bắt buộc)</span></div>
                            <input
                                className="student-info__input-box"
                                placeholder="0123456789"
                                type="number"
                                required
                            />
                        </div>
                        <div className="student-info__form__member-info__member-point">
                            <div className="student-info__title-text">Điểm hiện có</div>
                            <input
                                className="student-info__input-box"
                                placeholder="0"
                                type="number"
                            />
                        </div>
                        <div className="student-info__form__member-info__icon"><i class="fas fa-address-card"></i></div>
                    </div>
                    <div className="student-info__form__member-info">
                        <div className="student-info__form__member-info__phone-number">
                            <div className="student-info__title-text">Số điện thoại <span>* (bắt buộc)</span></div>
                            <input
                                className="student-info__input-box"
                                placeholder="0123456789"
                                type="number"
                                required
                            />
                        </div>
                        <div className="student-info__form__member-info__full-name">
                            <div className="student-info__form__member-info__full-name__last-name">
                                <div className="student-info__title-text">Họ</div>
                                <input
                                    className="student-info__input-box"
                                    placeholder="Nguyễn"
                                    type="text"
                                />
                            </div>
                            <div className="student-info__form__member-info__full-name__first-name">
                                <div className="student-info__title-text">Tên đệm và tên</div>
                                <input
                                    className="student-info__input-box"
                                    placeholder="Văn A"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="student-info__form__member-info__date-of-birth">
                            <div className="student-info__title-text">Sinh nhật</div>
                            <input
                                className="student-info__input-box"
                                type="date"
                            />
                        </div>
                        <div className="student-info__form__member-info__address">
                            <div className="student-info__title-text">Địa chỉ</div>
                            <input
                                className="student-info__input-box"
                                placeholder="số nhà/ đường/ phường/ ..."
                                type='text'
                            />
                        </div>
                        <div className="student-info__form__member-info__icon"><i class="fas fa-user-alt"></i></div>
                    </div>
                    <div className="student-info__form__member-info">
                        <div className="student-info__form__member-info__add-photo">
                            <button><i class="fas fa-plus-circle"></i></button>
                        </div>

                        <div className="student-info__form__member-info__icon"><i class="fas fa-camera-retro"></i></div>
                    </div>
                    <div className="student-info__form__button">
                        <button>
                            Tiếp <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

