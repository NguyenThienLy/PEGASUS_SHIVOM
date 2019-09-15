import * as React from "react";

import "./courseListBenefits.scss";
import { CourseBenefit } from "../courseBenefit/courseBenefit";

export class CourseListBenefits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="course-list-benefits">
        {/* <div className="course-list-benefits__title">Lợi ích sau khi học</div> */}
        <div className="course-list-benefits__content">
          {this.props.courseListBenefits.map((benefit, index) => {
            return (
              <CourseBenefit
                benefit={benefit}
                number={index + 1}
              ></CourseBenefit>
            );
          })}
        </div>
      </div>
    );
  }
}
