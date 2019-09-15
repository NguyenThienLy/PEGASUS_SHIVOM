import * as React from "react";

import "./courseBenefit.scss";

export class CourseBenefit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="course-benefit">
        <div className="course-benefit__number">{this.props.number}</div>
        <div className="course-benefit__content">{this.props.benefit}</div>
      </div>
    );
  }
}
