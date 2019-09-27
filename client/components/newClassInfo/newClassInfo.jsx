import * as React from "react";
import "./newClassInfo.scss";
import { ImageUpload } from "../imageUpload/imageUpload";

export class NewClassInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.props.handleChange(name, value);
    }

    render() {
        return (
            <div className="new-class-info">
                <div className="new-class-info__title">Thông tin cơ bản</div>
                <hr className="divider" />
                <form className="new-class-info__form">
                    <div className="new-class-info__form__info">
                        <div className="new-class-info__form__info__item">
                            <div className="new-class-info__title-text">
                                Tên lớp học <span>* (bắt buộc)</span>
                            </div>
                            <input
                                className="new-class-info__input-box"
                                placeholder="Yoga cộng đồng buổi sáng"
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="new-class-info__form__info__item">
                            <div className="new-class-info__title-text">
                                Sĩ số <span>* (bắt buộc)</span>
                            </div>
                            <input
                                className="new-class-info__input-box"
                                placeholder="50"
                                type="number"
                                name="quantity"
                                onChange={this.handleChange}
                            />
                        </div>

                        {/* <div className="new-class-info__form__info__item">
              <div className="new-class-info__title-text">
                Code <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-class-info__input-box"
                placeholder="Code 1"
                type="text"
                name="slug"
                onChange={this.handleChange}
              />
            </div> */}

                        <div className="new-class-info__form__info__icon">
                            <i className="fas fa-address-card"></i>
                        </div>
                    </div>

                    <div className="new-class-info__form__info">
                        <div className="new-class-info__form__info__item">
                            <div className="new-class-info__title-text">
                                Khóa học <span>* (bắt buộc)</span>
                            </div>
                            <div className="new-class-info__select-box">
                                <select required className="new-class-info__select-box__select"
                                    onChange={this.handleChange}
                                    name="course"
                                >
                                    <option value="" hidden>
                                        Chọn khoá học
                                    </option>
                                    {this.props.courses.map((course, index) => {
                                        return (
                                            <option value={course._id} key={index}>{course.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="new-class-info__form__info__item">
                            <div className="new-class-info__title-text">
                                Giáo viên <span>* (bắt buộc)</span>
                            </div>
                            <div className="new-class-info__select-box">
                                <select required className="new-class-info__select-box__select"
                                    onChange={this.handleChange}
                                    name="teacher">
                                    <option value="" hidden>
                                        Chọn giáo viên
                                    </option>
                                    {this.props.teachers.map((teacher, index) => {
                                        return (
                                            <option value={teacher._id} key={index}>{teacher.firstName} {teacher.lastName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="new-class-info__form__info__icon">
                            <i className="fas fa-user-alt"></i>
                        </div>
                    </div>

                    <div className="new-class-info__form__info">
                        <div className="new-class-info__title-text">Giới thiệu ngắn</div>
                        <div className="new-class-info__text-area">
                            <textarea
                                rows="10"
                                maxLength="100"
                                placeholder="Lớp học giúp bạn dẻo dai hơn"
                                name="shortDescription"
                                onChange={this.handleChange}
                            ></textarea>
                        </div>

                        <div className="new-class-info__form__info__icon">
                            <i className="fas fa-camera-retro"></i>
                        </div>
                    </div>
                    {/* <div className="new-class-info__form__button">
            <button>
              Tiếp tục <i className="fas fa-chevron-right"></i>
            </button>
          </div> */}
                </form>
            </div>
        );
    }
}
