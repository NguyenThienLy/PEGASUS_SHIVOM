import * as React from "react";
import "./courseOptions.scss";

export class CourseOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseOptions: [
                {
                    title: 'Yoga Cộng Đồng',
                    totalSlots: 36,
                    takenSlots: 32,
                    options: [
                        {
                            type: '1 tháng',
                            discount: '10%',
                            isChosen: false
                        },
                        {
                            type: '3 tháng',
                            discount: '10%',
                            isChosen: false
                        },
                        {
                            type: '6 tháng',
                            discount: '10%',
                            isChosen: false
                        },
                        {
                            type: '9 tháng',
                            discount: '10%',
                            isChosen: false
                        },
                        {
                            type: '12 tháng',
                            discount: '10%',
                            isChosen: false
                        }
                    ]
                }
            ],
            chosen: [
                {
                    title: '',
                    type: '',
                },
            ]
        }
        this.onClickHandle = this.onClickHandle.bind(this);
    }
    onClickHandle(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    render() {
        return (
            <div className="course-options">
                <div className="course-options__title">Chọn khoá học</div>
                <hr className="divider" />
                <ul className="course-options__content">
                    {
                        this.state.courseOptions.map((item, index) => {
                            return (
                                <li className="course-options__content__option" key={index}>
                                    <div className="course-options__content__option__icon">
                                        <i className="fab fa-pagelines"></i>
                                    </div>
                                    <div className="course-options__content__option__name">{item.title} <span>{item.takenSlots} / {item.totalSlots}</span></div>
                                    <ul className="course-options__content__option__list">
                                        {
                                            item.options.map((option, index) => {
                                                return (
                                                    <li className="course-options__content__option__list__item" onClick={this.onClickHandle}>
                                                        <div>{option.type}</div>
                                                        <div className="course-options__content__option__list__item__discount">
                                                            <i class="fas fa-tags"></i> {option.discount}
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        }
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Nhập vào..."
                                            className="course-options__content__option__list__optional"
                                        />
                                    </ul>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
