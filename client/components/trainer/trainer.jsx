import * as React from "react";
import "./trainer.scss";

export class Trainer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { trainer } = this.props;
    const widthSize = 120;
    //style={{width: `${widthSize}px`}}
    return (
      <div className="trainer">
        <div className="trainer__image">
          <div className="trainer__image__background" />
          <a href={trainer.link}>
            <img src={trainer.avatar} alt="" />
          </a>
        </div>
        <div className="trainer__info">
          <div className="trainer__info__type">
            <span>{trainer.type}</span>
          </div>
          <div className="trainer__info__name">{trainer.firstName} {trainer.lastName}</div>
          <div className="trainer__info__other">
            <a href={trainer.social.facebook}>
              <i class="fab fa-facebook-f" />
            </a>
            <a href={trainer.social.twitter}>
              <i class="fab fa-twitter" />
            </a>
            <a href={trainer.social.instagram}>
              <i class="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
