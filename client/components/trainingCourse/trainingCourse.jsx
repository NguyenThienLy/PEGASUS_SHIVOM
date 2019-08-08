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
          <a href={trainingCourse.link}>
            <img
              src={trainingCourse.image}
              alt=""
            />
          </a>
        </div>
        <div className="training-course__info">
          <div className="training-course__info__category">
            <a href={trainingCourse.link}>
              {trainingCourse.category}
            </a>
          </div>
          <h4 className="training-course__info__name">
            <a href={trainingCourse.link}>{trainingCourse.name}</a>
          </h4>
          <p className="training-course__info__detail">
            {trainingCourse.detail}
          </p>
          <div className="training-course__info__other">
            <div className="training-course__info__other__time">
              <span>
                <i class="far fa-clock fa-sm" />
              </span>
              <span>{trainingCourse.time}</span>
            </div>
            <div className="training-course__info__other__star">
              <span>
                <i class="far fa-star fa-sm" />
              </span>
              <span>{trainingCourse.star}</span>
            </div>
            <div className="training-course__info__other__love">
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
