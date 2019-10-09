import * as React from "react";
import "./courseOptions.scss";

export class CourseOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // courseOptions: [
      //   {
      //     title: "yoga cộng đồng",
      //     totalSlots: 36,
      //     takenSlots: 32,
      //     options: [
      //       {
      //         type: "1 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "3 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "6 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "9 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "12 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       }
      //     ]
      //   },
      //   {
      //     title: "yoga trẻ em",
      //     totalSlots: 36,
      //     takenSlots: 32,
      //     options: [
      //       {
      //         type: "1 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "3 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "6 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "9 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "12 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       }
      //     ]
      //   },
      //   {
      //     title: "yoga trị liệu",
      //     totalSlots: 36,
      //     takenSlots: 32,
      //     options: [
      //       {
      //         type: "1 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "3 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "6 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "9 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "12 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       }
      //     ]
      //   },
      //   {
      //     title: "yoga nhẹ nhàng",
      //     totalSlots: 36,
      //     takenSlots: 32,
      //     options: [
      //       {
      //         type: "1 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "3 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "6 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "9 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "12 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       }
      //     ]
      //   },
      //   {
      //     title: "yoga bà bầu",
      //     totalSlots: 36,
      //     takenSlots: 32,
      //     options: [
      //       {
      //         type: "1 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "3 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "6 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "9 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       },
      //       {
      //         type: "12 tháng",
      //         discount: "10%",
      //         isChosen: false
      //       }
      //     ]
      //   }
      // ]
    };
  }
  handleSelectPackage = (courseId, packageId) => {
    this.props.handleSelectCoursePackage(courseId, packageId)
  }
  handleInputMonth = (courseId, event) => {
    this.props.handleInputCourseMonthAmount(courseId, Number(event.target.value))
  }
  render() {
    return (
      <div className="course-options">
        <div className="course-options__title">Chọn khoá học</div>
        <hr className="divider" />
        <div className="course-options__content">
          {this.props.courses.map((item, index) => {
            return (
              <div className="course-options__content__course" key={index}>
                <div className="course-options__content__course__icon">
                  <i className="fab fa-pagelines"></i>
                </div>
                <div className="course-options__content__course__name">
                  {item.name}
                  <span>
                    {item.currentStudentAmount} / {item.quantity}
                  </span>
                </div>
                <div className="course-options__content__course__list-options">
                  {this.props.packages.map((packageData, index) => {
                    if (packageData.course === item._id) {
                      return (
                        <div
                          className="course-options__content__course__list-options__option"
                          key={index}
                          onClick={() => {
                            this.handleSelectPackage(item._id, packageData._id)
                          }}
                        >
                          <input type="checkbox" />
                          <div className="course-options__content__course__list-options__option__name">
                            {packageData.name}
                          </div>
                          <div className="course-options__content__course__list-options__option__discount">
                            <i className="fas fa-tags"></i>
                            {/* {packageData.discount.amount}{packageData.discount.type === "amount" ? " Đồng" : "%"} */}
                            {new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(packageData.discount.amount)}<u>đ</u>
                          </div>
                          {/* Giá của gói này
                          <div className="course-options__content__course__list-options__option__discount">
                            <i className="fas fa-tags"></i> {packageData.price}
                          </div> */}
                        </div>
                      );
                    }
                  })}
                  <div className="course-options__content__course__list-options__option--optional">
                    <input
                      className="course-options__content__course__list-options__option--optional"
                      type="number"
                      placeholder="Nhập vào số tháng"
                      onChange={(event) => { this.handleInputMonth(item._id, event) }}
                    />
                    {/* <div className="course-options__content__course__list-options__option__discount">
                      <i className="fas fa-tags"></i> {item.pricePerMonth}
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="course-options__content__button">
            <button>
              Tiếp tục <i className="fas fa-chevron-right"></i>
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
