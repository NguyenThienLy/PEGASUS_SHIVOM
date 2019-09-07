import * as React from "react";
import "./relatedPost.scss";

export class RelatedPost extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { relatedPost } = this.props;
    return (
      <div className="related-post">
        <div className="related-post__img">
          <img src={relatedPost.image} />
          <div className="related-post__img__created-date">
            <div className="related-post__img__created-date__day">{relatedPost.createdDate.day}</div>
            <div className="related-post__img__created-date__month">{relatedPost.createdDate.month}</div>
          </div>
        </div>
        <div className="related-post__author">
          <a href="#">{relatedPost.name}</a>
        </div>
        <div className="related-post__title">
          <a href="#">{relatedPost.title}</a>
        </div>
      </div>
    );
  }
}
