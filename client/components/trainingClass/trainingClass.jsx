import * as React from "react";
import "./trainingClass.scss";

export class TrainingClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { trainingClass } = this.props;
    return (
      <div className="training-class">
        <div className="training-class__image">
          <div className="training-class__image__background" />
          <a href={trainingClass.link}>
            <img
              src={trainingClass.image}
              alt=""
            />
          </a>
        </div>
        <div className="training-class__info">
          <div className="training-class__info__category">
            <a href={trainingClass.link}>
              {trainingClass.category}
            </a>
          </div>
          <h4 className="training-class__info__name">
            <a href={trainingClass.link}>{trainingClass.name}</a>
          </h4>
          <p className="training-class__info__detail">
            {trainingClass.detail}
          </p>
          <div className="training-class__info__other">
            <div className="training-class__info__other__time">
              <span>
                <i class="far fa-clock fa-sm" />
              </span>
              <span>{trainingClass.time}</span>
            </div>
            <div className="training-class__info__other__star">
              <span>
                <i class="far fa-star fa-sm" />
              </span>
              <span>{trainingClass.star}</span>
            </div>
            <div className="training-class__info__other__love">
              <span>
                <i class="fas fa-heart fa-sm" />
              </span>
              <span>{trainingClass.love}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}