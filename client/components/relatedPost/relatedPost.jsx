import * as React from "react";
import "./relatedPost.scss";
import * as moment from 'moment'
import Link from 'next/link'

export class RelatedPost extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { relatedPost } = this.props;
    return (
      <div className="related-post">
        <div className="related-post__img">
          <img src={relatedPost.thumb} />
          <div className="related-post__img__created-date">
            <div className="related-post__img__created-date__day">{moment(relatedPost.createdAt).date()}</div>
            <div className="related-post__img__created-date__month">Th {moment(relatedPost.createdAt).month() + 1}</div>
          </div>
        </div>
        <div className="related-post__author">
          <a href="#">{relatedPost.author.firstName} {relatedPost.author.lastName}</a>
        </div>
        <div className="related-post__title">
          <Link href={`/post/post?categorySlug=${relatedPost.category.slug}&newsSlug=${relatedPost.slug}`} as={`/${relatedPost.category.slug}/${relatedPost.slug}`}>
            <a href={`/${relatedPost.category.slug}/${relatedPost.slug}`}>{relatedPost.title}</a>
          </Link>
        </div>
      </div>
    );
  }
}
