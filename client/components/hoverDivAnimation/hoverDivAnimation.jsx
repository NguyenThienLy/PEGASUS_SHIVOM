import * as React from "react";
import "./hoverDivAnimation.scss";

export class HoverDivAnimation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hover-div">
        <a href="#" title={this.props.title}>
          {this.props.title}
        </a>
        <div className="hover-div--hover" />
      </div>
    );
  }
}
