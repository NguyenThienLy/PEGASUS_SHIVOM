import * as React from "react";
import "./news2.scss";
import { DefaultButton } from "../../components";

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
              <a href={news2.author.link}>{news2.author.name}</a>
            </div>
            <div className="news2__inner__info__category">
              <a href={news2.category.link}>{news2.category.name}</a>
            </div>
            <div className="news2__inner__info__tags">
              {news2.tags.map(tag => {
                return ([<a href={tag.link}>{tag.name}</a>,
                <span>,&nbsp;</span>]);
              })}
            </div>
          </div>
          <h3 className="news2__inner__title">
            <a href={news2.link}>{news2.title}</a>
          </h3>
          <div className="news2__inner__image">
            <div className="news2__inner__image__dateCreated">
              <a href={news2.dateCreated.link}>
                <span className="news2__inner__image__dateCreated__day">
                  {news2.dateCreated.day}
                </span>
                <span className="news2__inner__image__dateCreated__month">
                  {news2.dateCreated.month}
                </span>
              </a>
            </div>
            <a href={news2.link}>
              <img src={news2.image} alt="" />
            </a>
          </div>
          <div className="news2__inner__content">
            <p>{news2.content}</p>
          </div>
          <div className="news2__inner__more">
            <div className="news2__inner__more__comments-and-loves">
              <a href={news2.comment.link}>
                <i class="far fa-comment"></i>
                <span>{news2.comment.quantity}</span>
              </a>
              <span>&nbsp;/&nbsp;</span>
              <a href={news2.love.link}>
                <i class="far fa-heart"></i>
                <span>{news2.love.quantity}</span>
              </a>
            </div>
            <div className="news2__inner__more__button">
              <DefaultButton link={news2.link} content={news2.button} />
            </div>
            <div className="news2__inner__more__other" />
          </div>
        </div>
      </div>
    );
  }
}
