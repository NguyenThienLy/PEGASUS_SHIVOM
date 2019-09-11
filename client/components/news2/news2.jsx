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
                            <span>By&nbsp;</span>
                            <a href="#">
                                {news2.author.firstName}&nbsp;
                {news2.author.lastName}
                            </a>
                        </div>
                        <div className="news2__inner__info__category">
                            <Link
                                href={`/blog/blog?slug=${news2.category.slug}`}
                                as={`/${news2.category.slug}`}
                            >
                                <a href={news2.category.slug}>{news2.category.name}</a>
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
                    <h3 className="news2__inner__title">
                        <a href={news2.link}>{news2.title}</a>
                    </h3>
                    <div className="news2__inner__image">
                        <div className="news2__inner__image__dateCreated">
                            <a href="#">
                                <span className="news2__inner__image__dateCreated__day">
                                    {moment(news2.createdAt).day()}
                                </span>
                                <span className="news2__inner__image__dateCreated__month">
                                    {moment(news2.createdAt).month()}
                                </span>
                            </a>
                        </div>
                        <a href="#">
                            <img src={news2.thumb} alt="" />
                        </a>
                    </div>
                    <div
                        className="news2__inner__content"
                        dangerouslySetInnerHTML={{ __html: news2.content }}
                    >
                        {/* <p > </p> */}
                    </div>
                    <div className="news2__inner__more">
                        {/* <div className="news2__inner__more__comments-and-loves">
                            <a href="#">
                                <i class="far fa-comment"></i>
                                <span>56</span>
                            </a>
                            <span>&nbsp;/&nbsp;</span>
                            <a href="#">
                                <i class="far fa-heart"></i>
                                <span>66</span>
                            </a>
                        </div> */}
                        <div className="news2__inner__more__button">
                            <Link href={`/post/post?categorySlug=${news2.category.slug}&newsSlug=${news2.slug}`} as={`/${news2.category.slug}/${news2.slug}`}>
                                <a href={`/${news2.category.slug}/${news2.slug}`}>
                                    <DefaultButton link={news2.slug} content="Xem thêm" />
                                </a>
                            </Link>
                        </div>
                        <div className="news2__inner__more__other" />
                    </div>
                </div>
            </div>
        );
    }
}
