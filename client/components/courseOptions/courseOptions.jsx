import * as React from "react";
import "./courseOptions.scss";

export class CourseOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseOptions: [
        {
          title: "yoga cộng đồng",
          totalSlots: 36,
          takenSlots: 32,
          options: [
            {
              type: "1 tháng",
              discount: "10%",
              isChosen: false
            },
            {
              type: "3 tháng",
              discount: "10%",
              isChosen: false
            },
            {
              type: "6 tháng",
              discount: "10%",
              isChosen: false
            },
            {
              type: "9 tháng",
              discount: "10%",
              isChosen: false
            },
            {
              type: "12 tháng",
              discount: "10%",
              isChosen: false
            }
          ]
        },
        {
            title: "yoga trẻ em",
            totalSlots: 36,
            takenSlots: 32,
            options: [
              {
                type: "1 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "3 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "6 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "9 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "12 tháng",
                discount: "10%",
                isChosen: false
              }
            ]
          },
          {
            title: "yoga trị liệu",
            totalSlots: 36,
            takenSlots: 32,
            options: [
              {
                type: "1 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "3 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "6 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "9 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "12 tháng",
                discount: "10%",
                isChosen: false
              }
            ]
          },
          {
            title: "yoga nhẹ nhàng",
            totalSlots: 36,
            takenSlots: 32,
            options: [
              {
                type: "1 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "3 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "6 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "9 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "12 tháng",
                discount: "10%",
                isChosen: false
              }
            ]
          },
          {
            title: "yoga bà bầu",
            totalSlots: 36,
            takenSlots: 32,
            options: [
              {
                type: "1 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "3 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "6 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "9 tháng",
                discount: "10%",
                isChosen: false
              },
              {
                type: "12 tháng",
                discount: "10%",
                isChosen: false
              }
            ]
          }
      ],
      chosen: [
        {
          title: "",
          type: ""
        }
      ]
    };
    this.onClickHandle = this.onClickHandle.bind(this);
  }
  onClickHandle(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }
  render() {
    return (
      <div className="course-options">
        <div className="course-options__title">Chọn khoá học</div>
        <hr className="divider" />
        <div className="course-options__content">
          {this.state.courseOptions.map((item, index) => {
            return (
              <div className="course-options__content__course">
                <div className="course-options__content__course__icon">
                  <i className="fab fa-pagelines"></i>
                </div>
                <div className="course-options__content__course__name">
                  {item.title}
                  <span>
                    {item.takenSlots} / {item.totalSlots}
                  </span>
                </div>
                <div className="course-options__content__course__list-options">
                  {item.options.map((option, index) => {
                    return (
                      <div
                        className="course-options__content__course__list-options__option"
                        onClick={this.onClickHandle}
                      >
                        <div>{option.type}</div>
                        <div className="course-options__content__course__list-options__option__discount">
                          <i class="fas fa-tags"></i> {option.discount}
                        </div>
                      </div>
                    );
                  })}
                  <div className="course-options__content__course__list-options__option--optional">
                    <input className="course-options__content__course__list-options__option--optional"
                      type="text"
                      name=""
                      id=""
                      placeholder="Nhập vào..."
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
