import * as React from "react";
import "./stepsLine.scss";

export class StepsLine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stepsLine } = this.props;
    return (
      <div className="stepsLine">
        <div className="stepsLine__number">1</div>
        <div className="stepsLine__line"></div>
        <div className="stepsLine__number">2</div>
        <div className="stepsLine__line"></div>
        <div className="stepsLine__number">3</div>
        <div className="stepsLine__line"></div>
        <div className="stepsLine__number">4</div>
      </div>
    );
  }
}
