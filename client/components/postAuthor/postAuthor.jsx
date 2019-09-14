import * as React from "react";
import "./postAuthor.scss";

export class PostAuthor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { postAuthor } = this.props;
    return (
      <div className="post-author">
        <div className="post-author__avatar">
          <a href="#">
            <img
              src={postAuthor.avatar}
              alt="author's avatar"
            />
          </a>
        </div>
        <div className="post-author__info">
          <div className="post-author__info__position">Tác giả</div>
          <div className="post-author__info__name">
            <a href="#">{postAuthor.firstName} {postAuthor.lastName}</a>
          </div>
          <div className="post-author__info__description">
            {postAuthor.description}
          </div>
        </div>
      </div>
    );
  }
}
