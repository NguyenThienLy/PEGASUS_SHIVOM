import * as React from "react";
import "./numberSection.scss";

export class NumberSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="number-section">
        <div className="number-section__number">123</div>
        <div className="number-section__content">
          giờ ăn chơi
        </div>
      </div>
    );
  }
}
