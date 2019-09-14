import * as React from "react";
import "./reviewAddCourse.scss";
import { News2 } from "../../components";

export class ReviewAddCourse extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="reviewAddCourse">
        <div className="reviewAddCourse__title">Xác nhận thông tin</div>
        <hr className="divider" />
        <div className="reviewAddCourse__content">
          <div className="reviewAddMember__content__right">
            <div className="reviewAddMember__content__right__title">
              <div className="reviewAddMember__content__right__title__inner">
                <div>Thông tin cá nhân</div>
                <div className="reviewAddMember__content__right__title__inner--hover" />
              </div>
            </div>
            <div className="reviewAddMember__content__right__info">
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Mã số thẻ
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  54354456575
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Điểm tích lũy
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  0
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Họ
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  Nguyễn
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Tên đệm và tên
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  Văn A
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Số điện thoại
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  1234567899
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Sinh nhật
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  28/12/1994
                </div>
              </div>

              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__title">
                  Địa chỉ
                </div>
                <div className="reviewAddMember__content__right__info__item__content">
                  128/3G đường số 3 phường 11 quận Gò Vấp
                </div>
              </div>
            </div>

            <div className="reviewAddMember__content__right__title">
              <div className="reviewAddMember__content__right__title__inner">
                <div>Đăng ký khóa học</div>
                <div className="reviewAddMember__content__right__title__inner--hover" />
              </div>
            </div>
            <div className="reviewAddMember__content__right__info">
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__content">
                  Yoga cộng đồng
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__content">
                  Yoga trị liệu
                </div>
              </div>
              <div className="reviewAddMember__content__right__info__item">
                <div className="reviewAddMember__content__right__info__item__content">
                  Yoga bà bầu
                </div>
              </div>
            </div>

            <div className="reviewAddMember__content__right__title">
              <div className="reviewAddMember__content__right__title__inner">
                <div>Lịch học</div>
                <div className="reviewAddMember__content__right__title__inner--hover" />
              </div>
            </div>
            <div className="reviewAddMember__content__right__timeTable">
              <div className="reviewAddMember__content__right__timeTable__event">
                <div className="reviewAddMember__content__right__timeTable__event__date">
                  Thứ hai
                </div>
                <div className="reviewAddMember__content__right__timeTable__event__class-info">
                  <div className="time-table__list-events__event__class-info__class-name">
                    Cân bằng cơ thể
                  </div>
                  <div className="time-table__list-events__event__class-info__class-time">
                    07:00 - 09:00
                  </div>
                </div>
              </div>
              <div className="reviewAddMember__content__right__timeTable__event">
                <div className="reviewAddMember__content__right__timeTable__event__date">
                  Thứ ba
                </div>
                <div className="reviewAddMember__content__right__timeTable__event__class-info">
                  <div className="time-table__list-events__event__class-info__class-name">
                    Duỗi người
                  </div>
                  <div className="time-table__list-events__event__class-info__class-time">
                    07:00 - 09:00
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="reviewAddCourse__content__image">
            <div className="reviewAddCourse__content__image__dateCreated">
              <a>
                <span className="reviewAddCourse__content__image__dateCreated__day">
                  {/* {moment(this.state.course.createdAt).date()} */}
                  14
                </span>
                <span className="reviewAddCourse__content__image__dateCreated__month">
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

          {/* <div className="reviewAddCourse__content__author">
  {this.state.course.author}
</div> */}
          <div className="reviewAddCourse__content__title">
            {/* {this.props.course.name} */}
            Yoga cho người lớn tuổi
          </div>
          <div
            className="reviewAddCourse__content__content"
            // dangerouslySetInnerHTML={{ __html: this.props.course.description }}
          >
            nội dung bài viết
          </div>
          {/* <div className="reviewAddCourse__content__targets">
            {this.props.course.benefits.map((benefit, index) => {
              return (
                <div
                  className="reviewAddCourse__content__targets__target"
                  key={index}
                >
                  <i className="fas fa-check"></i>
                  {benefit}
                </div>
              );
            })}
          </div> */}
        </div>

        {/* <div className="reviewAddCourse__button">
          <button>Xác nhận</button>
        </div> */}
      </div>
    );
  }
}
