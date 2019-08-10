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
            <img src={trainer.image} alt="" />
          </a>
        </div>
        <div className="trainer__info">
          <div className="trainer__info__type">
            <span>{trainer.type}</span>
          </div>
          <div className="trainer__info__name">{trainer.name}</div>
          <div className="trainer__info__other">
            <a href={trainer.facebook}>
              <i class="fab fa-facebook-f fa-sm" />
            </a>
            <a href={trainer.twitter}>
              <i class="fab fa-twitter fa-sm" />
            </a>
            <a href={trainer.instagram}>
              <i class="fab fa-instagram fa-sm" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
