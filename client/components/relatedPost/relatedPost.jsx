import * as React from "react";
import "./relatedPost.scss";

export class RelatedPost extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="related-post">
        <div className="related-post__img">
          <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/blog-list-img-1.jpg" />
          <div className="related-post__img__created-date">
            <div className="related-post__img__created-date__day">ngay</div>
            <div className="related-post__img__created-date__month">th2</div>
          </div>
        </div>
        <div className="related-post__author">
          <a href="#">khach</a>
        </div>
        <div className="related-post__title">
          <a href="#">Ăn thịt chó có lợi gì cho tập luyện yoga</a>
        </div>
      </div>
    );
  }
}
