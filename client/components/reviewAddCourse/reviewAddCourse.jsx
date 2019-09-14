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
                yoga cộng đồng
              </div>
            </div>
            <div className="reviewAddCourse__content__info__item">
              <div className="reviewAddCourse__content__info__item__title">
                Tên đường dẫn
              </div>
              <div className="reviewAddCourse__content__info__item__content">
                yoga-cong-dong
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
              <img
                src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-4a-768x768.jpg"
                alt=""
              />
            </div>
            <div className="reviewAddCourse__content__images__item">
              <img
                src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-3a-768x768.jpg"
                alt=""
              />
            </div>
            <div className="reviewAddCourse__content__images__item">
              <img
                src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a-768x768.jpg"
                alt=""
              />
            </div>
            <div className="reviewAddCourse__content__images__item">
              <img
                src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a-768x768.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="reviewAddCourse__content__title">
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
          </div>

          <div className="reviewAddCourse__content__title">
            <div className="reviewAddCourse__content__title__inner">
              <div>Nội dung bài viết</div>
              <div className="reviewAddCourse__content__title__inner--hover" />
            </div>
          </div>
          <div className="reviewAddCourse__content__post">
            <div className="reviewAddCourse__content__post__image">
              <div className="reviewAddCourse__content__post__image__dateCreated">
                <a>
                  <span className="reviewAddCourse__content__post__image__dateCreated__day">
                    {/* {moment(this.state.course.createdAt).date()} */}
                    14
                  </span>
                  <span className="reviewAddCourse__content__post__image__dateCreated__month">
                    {/* Th {moment(this.state.course.createdAt).month() + 1} */}{" "}
                    Th 9
                  </span>
                </a>
              </div>
              {/* <img src={this.props.course.thumb} alt={this.props.course.name} /> */}
              <img
                src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg"
                alt="Yoga cho người lớn tuổi"
              />
            </div>

            {/* <div className="reviewAddCourse__content__post__author">
  {this.state.course.author}
</div> */}
            <div className="reviewAddCourse__content__post__title">
              {/* {this.props.course.name} */}
              Yoga cho người lớn tuổi
            </div>
            <div
              className="reviewAddCourse__content__post__content"
              // dangerouslySetInnerHTML={{ __html: this.props.course.description }}
            >
              nội dung bài viết
            </div>
          </div>
          <hr className="divider-grey" />
          <div className="reviewAddCourse__content__benefits">
            <CourseListBenefits
              courseListBenefits={this.state.courseListBenefits}
            ></CourseListBenefits>
          </div>

          <div className="reviewAddCourse__content__title">
            <div className="reviewAddCourse__content__title__inner">
              <div>Giáo viên</div>
              <div className="reviewAddCourse__content__title__inner--hover" />
            </div>
          </div>
          <div className="reviewAddCourse__content__trainer">
            <TrainerInfo trainerInfo={this.state.trainerInfo}></TrainerInfo>
          </div>
        </div>
      </div>
      /* <div className="reviewAddCourse__button">
          <button>Xác nhận</button>
        </div> */
    );
  }
}
