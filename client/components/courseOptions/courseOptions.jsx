import * as React from 'react';
import './courseOptions.scss';

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
  checkPageValidation() {
    if (this.props.selectedCourses.length === 0) {
      return false;
    }

    return true;
  }
  handleSelectPackage = (courseId, packageId) => {
    if ($(`.option_${courseId}_${packageId}`).prop('checked')) {
      // unselect option month
      $(`.option_month_${courseId}`).val(null);
      $(`.option_month_${courseId}`).css({
        backgroundColor: '#fff',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        color: '#363738'
      });
    }
    this.props.handleSelectCoursePackage(courseId, packageId);
    this.props.handleIsValid(this.props.pageNumber, this.checkPageValidation());
  };
  handleInputMonth = (courseId, event) => {
    let month = Number(event.target.value.trim());
    if (month !== 0) {
      $(event.target).css({
        backgroundColor: '#e1f2f4',
        border: '1px solid #e1f2f4',
        color: '#00a3af'
      });
      // uncheck option
      $(`.option_${courseId}`).prop('checked', false);
    } else {
      event.target.value = null;
      $(event.target).css({
        backgroundColor: '#fff',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        color: '#363738'
      });
    }

    this.props.handleInputCourseMonthAmount(courseId, month);
    this.props.handleIsValid(this.props.pageNumber, this.checkPageValidation());
  };
  render() {
    return (
      <div className="course-options">
        <div className="course-options__title">Chọn khoá học</div>
        <hr className="divider" />
        <div className="course-options__content">
          {this.props.courses.map((item, courseIndex) => {
            return (
              <div
                className="course-options__content__course"
                key={courseIndex}
              >
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
                  {this.props.packages.map((packageData, packageIndex) => {
                    if (packageData.course === item._id) {
                      return (
                        <div
                          className="course-options__content__course__list-options__option"
                          key={packageIndex}
                          onClick={() => {
                            this.handleSelectPackage(item._id, packageData._id);
                          }}
                        >
                          <input
                            className={`option_${item._id} option_${item._id}_${packageData._id}`}
                            type="checkbox"
                          />
                          <div className="course-options__content__course__list-options__option__name">
                            {packageData.name}
                          </div>
                          <div className="course-options__content__course__list-options__option__discount">
                            <i className="fas fa-tags"></i>
                            {/* {packageData.discount.amount}{packageData.discount.type === "amount" ? " Đồng" : "%"} */}
                            {new Intl.NumberFormat({
                              style: 'currency',
                              currency: 'VND'
                            }).format(packageData.discount.amount)}
                            <u>đ</u>
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
                      className={`option_month_${item._id}`}
                      type="number"
                      min="0"
                      placeholder="Nhập vào số tháng"
                      onChange={event => {
                        this.handleInputMonth(item._id, event);
                      }}
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
