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
