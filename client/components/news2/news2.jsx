import * as React from "react";
import "./news2.scss";
import { DefaultButton } from "../../components";
import moment from "moment";
import Link from "next/link";

export class News2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { news2 } = this.props;
    return (
      <div className="news2">
        <div className="news2__inner">
          <div className="news2__inner__info">
            <div className="news2__inner__info__author">
              <span>viết bởi&nbsp;</span>
              <a href="#">
                {news2.author.firstName}&nbsp;{news2.author.lastName}
              </a>
            </div>
            <div className="news2__inner__info__category">
              <Link
                href={`/blog/blog?slug=${news2.category.slug}`}
                as={`/${news2.category.slug}`}
              >
                <a href={`/${news2.category.slug}`}>{news2.category.name}</a>
              </Link>
            </div>
            {/* <div className="news2__inner__info__tags">
              {news2.tags.map(tag => {
                return [
                  <a href={tag.link}>{tag.name}</a>,
                  <span>,&nbsp;</span>
                ];
              })}
            </div> */}
          </div>
          <div className="news2__inner__title">
            <Link
              href={`/post/post?categorySlug=${news2.category.slug}&newsSlug=${news2.slug}`}
              as={`/${news2.category.slug}/${news2.slug}`}
            >
              <a href={`/${news2.category.slug}/${news2.slug}`}>
                {news2.title}
              </a>
            </Link>
          </div>
          <div className="news2__inner__image">
            <div className="news2__inner__image__created-date">
              <span className="news2__inner__image__created-date__day">
                {moment(news2.createdAt).date()}
              </span>
              <span className="news2__inner__image__created-date__month">
                Tháng {moment(news2.createdAt).month() + 1}
              </span>
            </div>
            <Link
              href={`/post/post?categorySlug=${news2.category.slug}&newsSlug=${news2.slug}`}
              as={`/${news2.category.slug}/${news2.slug}`}
            >
              <a href={`/${news2.category.slug}/${news2.slug}`}>
                <img src={news2.thumb} alt="" />
              </a>
            </Link>
          </div>
          <div
            className="news2__inner__content"
            dangerouslySetInnerHTML={{ __html: news2.description }}
          >
            {/* <p > </p> */}
          </div>
          <div className="news2__inner__more">
            {/* <div className="news2__inner__more__comments-and-loves">
                            <a href="#">
                                <i className="far fa-comment"></i>
                                <span>56</span>
                            </a>
                            <span>&nbsp;/&nbsp;</span>
                            <a href="#">
                                <i className="far fa-heart"></i>
                                <span>66</span>
                            </a>
                        </div> */}
            <div className="news2__inner__more__button">
              <Link
                href={`/post/post?categorySlug=${news2.category.slug}&newsSlug=${news2.slug}`}
                as={`/${news2.category.slug}/${news2.slug}`}
              >
                <a href={`/${news2.category.slug}/${news2.slug}`}>
                  <DefaultButton link={news2.slug} content="Xem thêm" />
                </a>
              </Link>
            </div>
            {/* <div className="news2__inner__more__other" /> */}
          </div>
        </div>
      </div>
    );
  }
}
