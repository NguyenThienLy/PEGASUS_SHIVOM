import * as React from "react";
import "./latestPost.scss";
import * as moment from 'moment'

import Link from 'next/link'

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
            <img src={latestPost.thumb} alt="" />
          </a>
        </div>
        <div className="latestPost__info">
          <div className="latestPost__info__title">
            <Link href={`/post/post?categorySlug=${latestPost.category.slug}&newsSlug=${latestPost.slug}`} as={`/${latestPost.category.slug}/${latestPost.slug}`}>
              <a href={`/${latestPost.category.slug}/${latestPost.slug}`}>{latestPost.title}</a>
            </Link>
          </div>
          <div className="latestPost__info__date">{moment(latestPost.createdAt).format("DD/MM")}</div>
        </div>
      </div>
    );
  }
}
