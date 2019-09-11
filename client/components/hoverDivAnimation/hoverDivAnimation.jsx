import * as React from "react";
import "./hoverDivAnimation.scss";

export class HoverDivAnimation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hoverDiv">
        <div className="hoverDiv__link" href="#" title={this.props.title}>
          <div className="hoverDiv__link__content">
            <div>{this.props.title}</div>
            <div className="hoverDiv__link__content--hover" />
          </div>
        </div>
      </div>
    );
  }
}
