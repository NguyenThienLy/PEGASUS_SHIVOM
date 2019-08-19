import * as React from "react";
import "./latestPost.scss";

export class LatestPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { latestPost } = this.props;
    return (
      <div className="latestPost">
        <div className="latestPost__image">
          <a href={latestPost.link}>
            <img src={latestPost.image} alt="" />
          </a>
        </div>
        <div className="latestPost__info">
          <div className="latestPost__info__title">
            <a href={latestPost.link}>{latestPost.title}</a>
          </div>
          <div className="latestPost__info__date">{latestPost.date}</div>
        </div>
      </div>
    );
  }
}
