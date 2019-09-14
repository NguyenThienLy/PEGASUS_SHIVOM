import * as React from "react";
import "./tryItNowForm.scss";

export class TryItNowForm extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
    }
    submit() {
        const body = {
            fullName: this.refs.name.value,
            address: this.refs.name.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            course: this.refs.course.value
        }
        this.props.addContact(body)
    }
    render() {
        return (
            <React.Fragment>
                <form className="try-it-now__form">
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        className="try-it-now__form__input"
                        ref="name"
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ"
                        className="try-it-now__form__input"
                        ref="address"
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="try-it-now__form__input"
                        ref="email"
                    />
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        className="try-it-now__form__input"
                        ref="phone"
                    />
                    <div className="try-it-now__form__select-box">

                        <select required className="try-it-now__form__select-box__select" ref="course">
                            {
                                this.props.defaultCourse ? <option value={this.props.defaultCourse._id}>{this.props.defaultCourse.name}</option> : this.props.courses.length > 0 ? this.props.courses.map(course => {
                                    return (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    )
                                }) : <option value="" hidden>
                                        Chọn khoá học
            </option>
                            }



                        </select>
                    </div>
                    <button onClick={this.submit}
                        type="button"
                        className="try-it-now__form__btn contact-us__form__btn--primary"
                    >
                        gửi
          </button>
                </form>
            </React.Fragment>
        )
    }
}
