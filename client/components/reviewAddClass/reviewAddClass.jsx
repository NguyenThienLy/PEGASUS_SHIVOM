import * as React from "react";
import "./reviewAddClass.scss";
import { CourseListBenefits } from "../courseListBenefits/courseListBenefits";
import { TrainerInfo } from "../trainerInfo/trainerInfo";
import { ClassTimeItem } from "../classTimeItem/classTimeItem";

export class ReviewAddClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classTimeItems: [
        {
          weekday: "Thứ hai",
          timeStart: { hour: 7, minute: 30 },
          timeEnd: { hour: 9, minute: 30 }
        },
        {
          weekday: "Thứ ba",
          timeStart: { hour: 6, minute: 0 },
          timeEnd: { hour: 8, minute: 0 }
        },
        {
          weekday: "Thứ tư",
          timeStart: { hour: 13, minute: 30 },
          timeEnd: { hour: 15, minute: 30 }
        },
        {
          weekday: "Thứ năm",
          timeStart: { hour: 16, minute: 0 },
          timeEnd: { hour: 17, minute: 0 }
        },
        {
          weekday: "Thứ bảy",
          timeStart: { hour: 15, minute: 0 },
          timeEnd: { hour: 18, minute: 0 }
        }
      ]
    };
  }
  getCourseThumb() {
    if (typeof this.props.data.thumb !== "string") {
      return <image src={URL.createObjectURL(this.props.data.thumb)} />;
    } else {
      return <image src={this.props.data.thumb} />;
    }
  }
  render() {
    return (
      <div className="review-add-class">
        <div className="review-add-class__title">Xác nhận thông tin</div>
        <hr className="divider" />
        <div className="review-add-class__content">
          <div className="review-add-class__content__title">
            <div className="review-add-class__content__title__inner">
              <div>Thông tin lớp học</div>
              <div className="review-add-class__content__title__inner--hover" />
            </div>
          </div>
          <div className="review-add-class__content__info">
            <div className="review-add-class__content__info__item">
              <div className="review-add-class__content__info__item__title">
                Tên lớp học
              </div>
              <div className="review-add-class__content__info__item__content">
                {/* {this.props.data.name} */} Yoga cộng đồng 1
              </div>
            </div>
            <div className="review-add-class__content__info__item">
              <div className="review-add-class__content__info__item__title">
                Sĩ số
              </div>
              <div className="review-add-class__content__info__item__content">
                {/* {this.props.data.slug} */} 50
              </div>
            </div>
            <div className="review-add-class__content__info__item">
              <div className="review-add-class__content__info__item__title">
                Mã code
              </div>
              <div className="review-add-class__content__info__item__content">
                {/* {this.props.data.slug} */} Code 1
              </div>
            </div>
            <div className="review-add-class__content__info__item">
              <div className="review-add-class__content__info__item__title">
                Khóa học
              </div>
              <div className="review-add-class__content__info__item__content">
                {/* {this.props.data.slug} */} Yoga cộng đồng
              </div>
            </div>
            <div className="review-add-class__content__info__item">
              <div className="review-add-class__content__info__item__title">
                Giáo viên
              </div>
              <div className="review-add-class__content__info__item__content">
                {/* {this.props.data.slug} */} Hoàng Thị Ngọc Hạnh
              </div>
            </div>
            <div className="review-add-class__content__info__item review-add-class__content__info__item--single">
              <div className="review-add-class__content__info__item__title">
                Giới thiệu ngắn
              </div>
              <div className="review-add-class__content__info__item__content">
                {/* {this.props.data.slug} */} Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Fuga tenetur odio esse, ut magni
                recusandae doloremque alias dolorum, tempore porro corrupti vel
                dolore perspiciatis facere vitae ipsam iste beatae assumenda.
              </div>
            </div>
          </div>

          <div className="review-add-class__content__title">
            <div className="review-add-class__content__title__inner">
              <div>Thời khóa biểu</div>
              <div className="review-add-class__content__title__inner--hover" />
            </div>
          </div>
          <div className="review-add-class__content__info">
            {this.state.classTimeItems.map((item, index) => {
              return (
                <div className="review-add-class__content__info__item">
                  <ClassTimeItem
                    weekday={item.weekday}
                    timeStart={item.timeStart}
                    timeEnd={item.timeEnd}
                  ></ClassTimeItem>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
