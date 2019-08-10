import * as React from "react";
import "./introHome2.scss";

export class IntroHome2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { introHome2 } = this.props;
    return (
      <div className="introHome2">
        <div className="introHome2__inner">
          <div className="introHome2__inner__image">
            <img src={introHome2.image} alt="" />
          </div>
          <div className="introHome2__inner__title">{introHome2.title}</div>
          <div className="introHome2__inner__content">{introHome2.content}</div>
        </div>
      </div>
    );
  }
}
