import * as React from "react";
import "./relatedPost.scss";
import * as moment from "moment";
import Link from "next/link";

export class RelatedPost extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { relatedPost } = this.props;
    return (
      <div className="related-post">
        <div className="related-post__image">
          <img src={relatedPost.thumb} />
          <div className="related-post__image__created-date">
            <span className="related-post__image__created-date__day">
              {moment(relatedPost.createdAt).date()}
            </span>
            <span className="related-post__image__created-date__month">
              Tháng {moment(relatedPost.createdAt).month() + 1}
            </span>
          </div>
        </div>

        <div className="related-post__title">
          <Link
            href={`/post/post?categorySlug=${relatedPost.category.slug}&newsSlug=${relatedPost.slug}`}
            as={`/${relatedPost.category.slug}/${relatedPost.slug}`}
          >
            <a href={`/${relatedPost.category.slug}/${relatedPost.slug}`}>
              {relatedPost.title}
            </a>
          </Link>
        </div>

        <div className="related-post__author">
          viết bởi &nbsp;
          <a href="#">
            {relatedPost.author.firstName} {relatedPost.author.lastName}
          </a>
        </div>
      </div>
    );
  }
}
