import * as React from "react";
import "./introHome.scss";

export class IntroHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { introHome } = this.props;
    return (
      <div className="introHome">
        <div className="introHome__inner">
          <div className="introHome__inner__image">
            <a href={introHome.link}>
              <img src={introHome.image} alt="" />
            </a>
          </div>
          <div className="introHome__inner__title">
            <a href={introHome.link}>{introHome.title}</a>
          </div>
          <div className="introHome__inner__content">{introHome.content}</div>
        </div>
      </div>
    );
  }
}
