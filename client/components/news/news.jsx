import * as React from "react";
import "./news.scss";
import {
    DefaultButton
  } from "../../components";

export class News extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { news } = this.props;
    return (
      <div className="news">
        <div className="news__info">
          <div className="news__info__category">
            <a className href={news.link}>
            {news.category}
            </a>
          </div>
          <h4 className="news__info__title">
            <a href={news.link}>{news.title}</a>
          </h4>
          <p className="news__info__detail">
          {news.detail}
          </p>
          <div className="news__info__more">
            <DefaultButton link={news.link} content={news.more}></DefaultButton>
          </div>
        </div>
        <div className="news__image">
          <div className="news__image__background" />
          <a href={news.link}>
            <img
              src={news.image}
              alt=""
            />
          </a>
        </div>
      </div>
    );
  }
}
