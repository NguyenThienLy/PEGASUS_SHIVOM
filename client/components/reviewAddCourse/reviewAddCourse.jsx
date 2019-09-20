import * as React from "react";
import "./reviewAddCourse.scss";
import { CourseListBenefits } from "../courseListBenefits/courseListBenefits";
import { TrainerInfo } from "../trainerInfo/trainerInfo";

export class ReviewAddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainerInfo: {
        avatar:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-4a-768x768.jpg",
        firstName: "Hạnh",
        lastName: "Hoàng Thị Ngọc",
        shortDescription: "mô tả giáo viên"
      },
      courseListBenefits: [
        "Đem lại sự trẻ đẹp và dẻo dai diệu kỳ",
        "Đem lại sự trẻ đẹp và dẻo dai diệu kỳ",
        "Đem lại sự trẻ đẹp và dẻo dai diệu kỳ",
        "Đem lại sự trẻ đẹp và dẻo dai diệu kỳ"
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

  componentDidMount() {
    console.log(this.props.data);
  }
  render() {
    return (
      <div className="reviewAddCourse">
        <div className="reviewAddCourse__title">Xác nhận thông tin</div>
        <hr className="divider" />
        <div className="reviewAddCourse__content">
          <div className="reviewAddCourse__content__title">
            <div className="reviewAddCourse__content__title__inner">
              <div>Thông tin khóa học</div>
              <div className="reviewAddCourse__content__title__inner--hover" />
            </div>
          </div>
          <div className="reviewAddCourse__content__info">
            <div className="reviewAddCourse__content__info__item">
              <div className="reviewAddCourse__content__info__item__title">
                Tên
              </div>
              <div className="reviewAddCourse__content__info__item__content">
                {this.props.data.name}
              </div>
            </div>
            <div className="reviewAddCourse__content__info__item">
              <div className="reviewAddCourse__content__info__item__title">
                Đường dẫn
              </div>
              <div className="reviewAddCourse__content__info__item__content">
                {this.props.data.slug}
              </div>
            </div>
          </div>

          <div className="reviewAddCourse__content__title">
            <div className="reviewAddCourse__content__title__inner">
              <div>Hình ảnh</div>
              <div className="reviewAddCourse__content__title__inner--hover" />
            </div>
          </div>
          <div className="reviewAddCourse__content__images">
            <div className="reviewAddCourse__content__images__item">
              <img src={this.props.data.thumbUrl} alt="" />
            </div>
          </div>

          {/* <div className="reviewAddCourse__content__title">
            <div className="reviewAddCourse__content__title__inner">
              <div>Lịch học</div>
              <div className="reviewAddCourse__content__title__inner--hover" />
            </div>
          </div>
          <div className="reviewAddCourse__content__timeTable">
            <div className="reviewAddCourse__content__timeTable__event">
              <div className="reviewAddCourse__content__timeTable__event__date">
                Thứ hai
              </div>
              <div className="reviewAddCourse__content__timeTable__event__class-info">
                <div className="reviewAddCourse__content__timeTable__event__class-info__class-name">
                  Cân bằng cơ thể
                </div>
                <div className="reviewAddCourse__content__timeTable__event__class-info__class-time">
                  07:00 - 09:00
                </div>
              </div>
            </div>
            <div className="reviewAddCourse__content__timeTable__event">
              <div className="reviewAddCourse__content__timeTable__event__date">
                Thứ ba
              </div>
              <div className="reviewAddCourse__content__timeTable__event__class-info">
                <div className="reviewAddCourse__content__timeTable__event__class-info__class-name">
                  Duỗi người
                </div>
                <div className="reviewAddCourse__content__timeTable__event__class-info__class-time">
                  07:00 - 09:00
                </div>
              </div>
            </div>
          </div> */}

          <div className="reviewAddCourse__content__title">
            <div className="reviewAddCourse__content__title__inner">
              <div>Nội dung bài viết</div>
              <div className="reviewAddCourse__content__title__inner--hover" />
            </div>
          </div>
          <div
            className="reviewAddCourse__content__post"
            dangerouslySetInnerHTML={{ __html: this.props.data.description }}
          ></div>
          <hr className="divider-grey" />
          <div className="reviewAddCourse__content__title">
            <div className="reviewAddCourse__content__title__inner">
              <div>Lợi ích khóa học</div>
              <div className="reviewAddCourse__content__title__inner--hover" />
            </div>
          </div>
          <div className="reviewAddCourse__content__benefits">
            <CourseListBenefits
              courseListBenefits={this.props.data.benefits}
            ></CourseListBenefits>
          </div>

          {/* <div className="reviewAddCourse__content__title">
            <div className="reviewAddCourse__content__title__inner">
              <div>Giáo viên</div>
              <div className="reviewAddCourse__content__title__inner--hover" />
            </div>
          </div>
          <div className="reviewAddCourse__content__trainer">
            <TrainerInfo trainerInfo={this.state.trainerInfo}></TrainerInfo>
          </div> */}
        </div>
      </div>
      /* <div className="reviewAddCourse__button">
          <button>Xác nhận</button>
        </div> */
    );
  }
}
