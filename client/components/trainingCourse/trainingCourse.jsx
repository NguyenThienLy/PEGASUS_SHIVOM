import * as React from "react";
import "./trainingCourse.scss";

export class TrainingCourse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { trainingCourse } = this.props;
    return (
      <div className="training-course">
        <div className="training-course__image">
          <div className="training-course__image__background" />
          <a href="#">
            <img
              src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="training-course__content">
          <div className="training-course__content__category">
            <a className href="#">
              {trainingCourse.category}
            </a>
          </div>
          <h4 className="training-course__content__name">
            <a href="#">{trainingCourse.name}</a>
          </h4>
          <p className="training-course__content__info">
            {trainingCourse.info}
          </p>
          <div className="training-course__content__other">
            <div className="training-course__content__other__time">
              <span>
                <i class="far fa-clock fa-sm" />
              </span>
              <span>{trainingCourse.time}</span>
            </div>
            <div className="training-course__content__other__star">
              <span>
                <i class="far fa-star fa-sm" />
              </span>
              <span>{trainingCourse.star}</span>
            </div>
            <div className="training-course__content__other__love">
              <span>
                <i class="fas fa-heart fa-sm" />
              </span>
              <span>{trainingCourse.love}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
