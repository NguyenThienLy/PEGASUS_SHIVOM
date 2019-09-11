import * as React from "react";
import "./news.scss";
import {
  DefaultButton
} from "../../components";
import Link from 'next/link'

export class News extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { news } = this.props;
    console.log("news : ", this.props)
    return (
      <div className="news">
        <div className="news__info">
          <div className="news__info__category">
            <a className href={news.link}>
              {news.category.name}
            </a>
          </div>
          <h4 className="news__info__title">
            <a href={news.link}>{news.title}</a>
          </h4>
          <p className="news__info__content">
            {news.description}
          </p>
          <div className="news__info__more">
            <Link href={`/post/post?categorySlug=${news.category.slug}&newsSlug=${news.slug}`} as={`/${news.category.slug}/${news.slug}`}>
              <a href={`/${news.category.slug}/${news.slug}`}>
                <DefaultButton link={news.link} content="Xem thêm"></DefaultButton>
              </a>
            </Link>
          </div>
        </div>
        <div className="news__image">
          <div className="news__image__background" />
          <a href={news.link}>
            <img
              src={news.thumb}
              alt=""
            />
          </a>
        </div>
      </div>
    );
  }
}
